import { Button } from "@/components/ui/button";
import "./App.css";
import { Input } from "@/components/ui/input";
import { CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState<string>("");
  const [inputNumber, setInputNumber] = useState<string>("");

  const isBtnEnabled = input.trim() !== "" && inputNumber.trim() !== "";

  return (
    <>
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
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            className="flex-1/6"
            placeholder=""
            type="number"
          />
        </div>
        <Button disabled={!isBtnEnabled} size={"lg"} className={"w-full"}>
          Eintrag Hinzufügen
        </Button>

        <div className="flex flex-col w-full gap-2 mt-6">
          <div className="border bg-card rounded-xl p-5 text-card-foreground flex justify-between items-center">
            <div className="items-start flex flex-col">
              <h3 className="text-lg font-semibold">Produkt{}</h3>
              <p className="text-sm text-muted-foreground">Anzahl:{}</p>
            </div>
            <Button size={"lg"} variant={"outline"}>
              <CheckCircleIcon />
              Abhaken
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
