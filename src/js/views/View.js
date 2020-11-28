class View {
    //Main handler for View database from server
    addHandlerDatabase(handler) {
        window.addEventListener("load", () => {
            handler();
        });
    };

}
export default new View();