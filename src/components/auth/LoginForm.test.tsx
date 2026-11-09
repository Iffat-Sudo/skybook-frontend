import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { login } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { renderWithProviders } from "@/test/renderWithProviders";


// A fake router, so we can check where the user is sent
const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

// A fake API, so tests don't need the real backend
vi.mock("@/lib/api/auth", () => ({
  login: vi.fn(),
  register: vi.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.localStorage.clear();
  });

  it("fills in the demo account", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm next="/" />);

    await user.click(screen.getByRole("button", { name: "Fill in the demo account" }));

    expect(screen.getByLabelText("Email")).toHaveValue("demo@skybook.com");
  });

  it("logs in and goes to the next page", async () => {
    vi.mocked(login).mockResolvedValue({
      token: "test-token",
      expiresAt: "2099-01-01T00:00:00Z",
      user: { id: 1, name: "Iffat Zabin", email: "iffat@example.com" },
    });
    const user = userEvent.setup();
    renderWithProviders(<LoginForm next="/bookings" />);

    await user.type(screen.getByLabelText("Email"), "iffat@example.com");
    await user.type(screen.getByLabelText("Password"), "SkyBook2026!");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    await waitFor(() => expect(push).toHaveBeenCalledWith("/bookings"));
    expect(vi.mocked(login).mock.calls[0][0]).toEqual({
      email: "iffat@example.com",
      password: "SkyBook2026!",
    });
  });

  it("shows the error message from the backend", async () => {
    vi.mocked(login).mockRejectedValue(new ApiError(401, "Wrong email or password"));
    const user = userEvent.setup();
    renderWithProviders(<LoginForm next="/" />);

    await user.type(screen.getByLabelText("Email"), "iffat@example.com");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Wrong email or password");
    expect(push).not.toHaveBeenCalled();
  });
});