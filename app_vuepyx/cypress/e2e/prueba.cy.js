describe("Pruebas E2E",()=>{
 let url="";

 beforeEach(() => {
    url = "/";

    cy.request({
    method: "POST",
    url: "http://localhost:8081/asis/login",
    body: { correo: "davidmp@upeu.edu.pe", password: "Da12345*" },
    }).then(({ body }) => {
    window.localStorage.setItem("token", body.token);
    window.localStorage.setItem("ver", "Holas");
    });

    // Caching session when logging in via API
    cy.setCookie("session_id", "189jd09sufh33aaiidhf99d09");
    });

    it("login", () => {
        cy.visit(url);
        cy.get("input[type=text]").type("davidmp@upeu.edu.pe");
        cy.get("input[type=password]").type("Da12345*");
        cy.get("button").contains("Iniciar").click();
        });

    it("reportar", () => {
        cy.visit(url+"app/home");
        });

        it("reporte e insertar periodo", () => {
            cy.wait(2000) // 2 segundos
            cy.visit(url + "app/periodo");
            //cy.visit(url+'/app/personal')
            //cy.url().should('include', '/app/personal')
            cy.get("input[placeholder=CI]").type("0");
            cy.get("input[placeholder=Nombre]").type("2024-1");
            cy.get("input[placeholder=Estado]").type("Inactivo");
            //cy.get('input[placeholder=Telefono]').type('951782520')
            //cy.get('input[placeholder=Email]').type('mamanipari@gmail.com')
            cy.get("button").contains("Guardar").click();
            });

            it("Modificar Periodo", () => {
                cy.visit(url + "app/periodo");
                
                // Esperar a que la tabla esté visible
                cy.get("table tbody").should('be.visible');
            
                // Seleccionar el registro de la tabla
                cy.get("table tbody tr").eq(2).as("record");
                
                // Hacer clic en el botón para modificar
                cy.get("@record").find("button").eq(0).click();
            
                // Modificar el valor del input
                cy.get("@record").find("input").eq(2).clear().type("Activo");

                // Hacer clic en el botón para guardar los cambios
                cy.get("@record").find("button").eq(0).click(); // Asegúrate de que el índice del botón es correcto
            });

        /*it("Modificar Periodo", () => {
            cy.wait(2000) // 2 segundos
            cy.visit(url + "app/periodo");
            cy.get("table tbody tr").eq(2).as("record");
            cy.get("@record").find("button").eq(0).as("terrecord");
            cy.get("@terrecord").click();
            cy.get("table tbody tr").eq(2).as("recorde");
            cy.get("@recorde").find("input").eq(2).invoke('val',"Activo")
            cy.get("table tbody tr").eq(2).as("recordex");
            cy.wait(1500)
            cy.get("@recordex").find("button").eq(0).as("terrecordx");
            cy.get("@terrecordx").click();
            });*/

        it("Eliminar Periodo", () => {
            cy.wait(2000) // 2 segundos
            cy.visit(url + "app/periodo");
            cy.get("table tbody tr").eq(2).as("record");
            cy.get("@record").find("button").eq(1).as("terrecord");
            cy.get("@terrecord").click();
            cy.get('.p-button-danger').click()
            cy.visit(url+"app/periodo");
            });

});