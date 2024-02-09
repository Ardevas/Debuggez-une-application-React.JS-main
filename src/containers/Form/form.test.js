import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./form";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Envoyer");
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  describe("and all fields are filled", () => {
    it("calls the success action", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // Retrieve all form fields
      const nomField = await screen.findByPlaceholderText("Entrez votre nom");
      const prenomField = await screen.findByPlaceholderText(
        "Entrez votre prénom"
      );
      const emailField = await screen.findByPlaceholderText(
        "Entrez votre email"
      );
      const messageField = await screen.findByPlaceholderText(
        "Entrez votre message"
      );

      // Simulate text entry in each field
      await fireEvent.change(nomField, { target: { value: "Bardot" } });
      await fireEvent.change(prenomField, { target: { value: "Thomas" } });
      await fireEvent.change(emailField, {
        target: { value: "thomas.bardot@openclassrooms-student.com" },
      });
      await fireEvent.change(messageField, {
        target: { value: "Bonjour, ceci est un message de test." },
      });

      // Trigger a click on the submit button
      fireEvent.click(screen.getByTestId("button-test-id"));

      // Waiting for the success action to be called
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });
});
