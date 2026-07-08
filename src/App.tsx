import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import "./App.css";
import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";

interface Item {
  id: string;
  name: string;
  amount: number;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<number>(0);

  // speichern
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem("shopping_list");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const isBtnEnabled = input.trim() !== "" && inputNumber !== 0;

  const handleAddItem = () => {
    if (!isBtnEnabled) return;

    const exists = items.some((item) => item.name === input.trim());
    if (exists) {
      toast.error("Schon vorhanden", {
        description: `"${input.trim()}" steht bereits auf der Liste.`,
      });
      return;
    }

    const newItem: Item = {
      id: crypto.randomUUID(),
      name: input.trim(),
      amount: Number(inputNumber),
    };

    const updatedItems = [newItem, ...items];
    setItems(updatedItems);

    localStorage.setItem("shopping_list", JSON.stringify(updatedItems));

    setInput("");
    setInputNumber(0);
  };

  return (
    <>
      <Toaster
        theme="light"
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "rounded-xl border-2 !bg-red-600 !text-white !border-red-700",
            title: "font-bold",
            description: "text-muted-foreground",
          },
        }}
      />
      <section className="m-5 flex flex-col max-w-lg mx-auto gap-4 text-center justify-center items-center">
        <h1 className="text-3xl font-bold font-roboto mt-10">Einkaufsliste</h1>
        <div className="flex gap-2 w-full ">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-auto"
            placeholder="Produkt eingeben..."
          />
          <Input
            value={inputNumber.toString()}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            className="flex-1/6"
            placeholder=""
            type="number"
            min={1}
          />
        </div>
        <Button disabled={!isBtnEnabled} size={"lg"} className={"w-full"} onClick={handleAddItem}>
          Eintrag Hinzufügen
        </Button>

        <div className="flex flex-col w-full gap-2 mt-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border bg-card rounded-xl p-5 text-card-foreground flex justify-between items-center">
              <div className="items-start flex flex-col">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.amount}</p>
              </div>
              <Button size={"lg"} variant={"outline"}>
                <CheckCircleIcon />
                Abhaken
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
