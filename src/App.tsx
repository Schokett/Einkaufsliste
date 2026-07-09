import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import "./App.css";
import { CheckCircleIcon, CornerUpLeft, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  name: string;
  amount: number;
  checked: boolean;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<number>(0);

  const [items, setItems] = useState<Item[]>(() => {
    const SAVEDITEMS_KEY = localStorage.getItem("shopping_list");
    return SAVEDITEMS_KEY ? JSON.parse(SAVEDITEMS_KEY) : [];
  });

  const isBtnEnabled = input.trim() !== "" && inputNumber !== 0;

  // speichern
  useEffect(() => {
    localStorage.setItem("shopping_list", JSON.stringify(items));
  }, [items]);

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
      checked: false,
    };

    const updatedItems = [newItem, ...items];
    setItems(updatedItems);

    setInput("");
    setInputNumber(0);
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id != id));
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
                <h3
                  className={`text-lg font-semibold ${item.checked ? "text-muted-foreground line-through" : ""}`}>
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">{item.amount}</p>
              </div>
              <div className="flex gap-2 w-35 shrink-0">
                {item.checked && (
                  <Button
                    size={"lg"}
                    variant="destructive"
                    className={"bg-rose-600 cursor-pointer text-white flex-1/3"}
                    onClick={() => handleDeleteItem(item.id)}>
                    <Trash />
                  </Button>
                )}
                <Button
                  size={"lg"}
                  className={`flex-2/3 cursor-pointer ${item.checked ? "bg-slate-100 text-black hover:bg-slate-200 cursor-pointer" : ""}`}
                  variant={item.checked ? "default" : "outline"}
                  onClick={() => handleToggleItem(item.id)}>
                  {item.checked ? <CornerUpLeft /> : <CheckCircleIcon />}
                  {item.checked ? "Zurück" : "Abhaken"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
