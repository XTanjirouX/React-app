import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Fields from "./Fields";
import { useNavigate } from "react-router-dom";

global.fetch = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Fields Component", () => {
  let mockNavigate;

  beforeEach(() => {
    // Reiniciamos mocks antes de cada test
    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    global.fetch.mockClear();
  });
  
  test("should navigate to field details on button click", async () => {
    const mockFields = [
      {
        id: "1",
        fieldname: "Field A",
        fieldnumber: "123",
        rows: [{}, {}, {}], // mock rows data
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFields,
    });

    render(<Fields />);

    await waitFor(() => screen.getByText("Field A"));

    const button = screen.getByText("Bekijk veld");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/field/1", {
      state: { field: mockFields[0] },
    });
  });
});