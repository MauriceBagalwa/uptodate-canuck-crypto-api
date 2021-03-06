class CardanoWasmLoader {
    private static _cardano: typeof import("@emurgo/cardano-serialization-lib-browser");

    public get Cardano() {
        return CardanoWasmLoader._cardano;
    }

    public async Load(): Promise<void> {
        let importedModule = await import("@emurgo/cardano-serialization-lib-browser");
        CardanoWasmLoader._cardano = await importedModule.default;
    }
}

export default new CardanoWasmLoader();