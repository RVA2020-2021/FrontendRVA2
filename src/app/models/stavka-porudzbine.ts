import { Artikl } from "./artikl";
import { Porudzbina } from "./porudzbina";

export class StavkaPorudzbine {
    id: number;
    cena: number;
    jedinicaMere: String;
    kolicina: number;
    redniBroj: number;
    artikl: Artikl;
    porudzbina:Porudzbina;
}