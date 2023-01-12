import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { RouterProvider, createMemoryRouter } from "react-router-dom";
// Routes config
import routesConfig from "./routesConfig";
// APIs
import * as StockDataAPI from "./apis/StockDataAPI";
import * as ChartStockAPI from "./apis/ChartStockAPI";

// Mocks
jest.mock("./apis/StockDataAPI");
jest.mock("./apis/ChartStockAPI");
window.scrollTo = jest.fn();

// Mocked to fix "ResponsiveContainer" testing error
jest.mock("recharts", () => ({
  ...jest.requireActual("recharts"),
  ResponsiveContainer: props => <div {...props} />,
}));

describe("----- <App/> -----", () => {
  beforeEach(() => {
    // Mock API functions
    StockDataAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        chartStocks: [
          { ticker: "AAPL" },
          { ticker: "GOOG"}
        ],
        chartData: [
          {
            "2000-01-01": {
              "4. close": "100"
            },
            "2000-01-08": {
              "4. close": "101"
            },
            "2000-01-15": {
              "4. close": "110"
            }
          },
          {
            "2000-01-01": {
              "4. close": "100"
            },
            "2000-01-08": {
              "4. close": "150"
            },
            "2000-01-15": {
              "4. close": "200"
            }
          }
        ]
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly retrieves data on load", async () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
  
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("popup")).toBeInTheDocument();
      expect(screen.getByText("Chart updated")).toBeInTheDocument();

      expect(screen.getByTestId("updateStatus")).toBeInTheDocument();
      expect(screen.getByText("Updated")).toBeInTheDocument();

      expect(screen.getByTestId("chart")).toBeInTheDocument();

      expect(screen.getByTestId("chartStocks")).toBeInTheDocument();
      expect(screen.getByText("AAPL")).toBeInTheDocument();
      expect(screen.getByText("GOOG")).toBeInTheDocument();
      
      expect(screen.getByTestId("form")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly submits form data", async () => {
    // Mock API functions
    ChartStockAPI.create.mockResolvedValue({
      data: { success: true }
    });

    // Other mocks
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }))

    global.setImmediate = jest.useRealTimers;

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
  
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByTestId("form-input")).toBeInTheDocument();
    });

    userEvent.type(screen.getByTestId("form-input"), "MSFT");
    userEvent.click(screen.getByTestId("form-submit"));

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("Chart updated")).toBeInTheDocument();
  });

  //----- Test 3 -----
  it("correctly removes a chart-stock", async () => {
    // Mock API functions
    ChartStockAPI.deleteOne.mockResolvedValue({
      data: { success: true }
    });

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
  
    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getAllByTestId("chartStocks-remove")).toHaveLength(2);
    });

    userEvent.click(screen.getAllByTestId("chartStocks-remove")[0]);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("popup")).toBeInTheDocument();
    expect(screen.getByText("Chart updated")).toBeInTheDocument();
  });
});