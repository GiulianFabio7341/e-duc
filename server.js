process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("API Educação rodando 🚀");
});

app.get("/ideb", async (req, res) => {

    const id = req.query.id;
    const ano = req.query.ano;

    try {

        const municipal = await axios.get("https://api.qedu.org.br/v1/ideb", {
            params: {
                id: id,
                dependencia_id: 3,
                ciclo_id: "AF",
                ano: ano
            },
            headers: {
                Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
            }
        });
        

        const publico = await axios.get("https://api.qedu.org.br/v1/ideb", {
            params: {
                id: id,
                dependencia_id: 5,
                ciclo_id: "AF",
                ano: ano
            },
            headers: {
                Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
            }
        });

        res.json({
            municipal: municipal.data.data[0].ideb,
            publico: publico.data.data[0].ideb,
            aprmunicipal:municipal.data.data[0].aprendizado,
            aprpublico:publico.data.data[0].aprendizado
          
        });

    } catch (error) {

        console.log(error.response?.data || error.message);
        res.status(500).json({ erro: "Erro ao buscar IDEB" });

    }

});

app.get("/censo", async (req, res) => {

    const id = req.query.id
    const ano = req.query.ano

    try {

        const censomunicipal = await axios.get(
            "https://api.qedu.org.br/v1/censo/territorio",
            {
                params: {
                    ano: ano,
                    dependencia_id: 3,
                    ibge_id: id,
                    oferta_id: 2
                },
                headers: {
                    Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
                }
            }
        )

        const censopublica = await axios.get(
            "https://api.qedu.org.br/v1/censo/territorio",
            {
                params: {
                    ano: ano,
                    dependencia_id: 5,
                    ibge_id: id,
                    oferta_id: 2
                },
                headers: {
                    Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
                }
            }
        )

        res.json({
           censomunicipal: censomunicipal.data.data[0].matriculas_anos_finais,
            censopublica: censopublica.data.data[0].matriculas_anos_finais
        })

    } catch (erro) {

        console.log(erro.response?.data || erro.message)

        res.status(500).json({
            erro: "Erro ao buscar censo"
        })

    }

})

app.get("/indicador", async (req, res) => {

    const id = req.query.id
    const ano = req.query.ano

    try {

        const series = [6,7,8,9]

        let aprMunicipal = 0
        let repMunicipal = 0
        let abaMunicipal = 0

        let aprPublica = 0
        let repPublica = 0
        let abaPublica = 0

        let contMunicipal = 0
        let contPublica = 0

        for (let serie of series) {

            const municipal = await axios.get(
                "https://api.qedu.org.br/v1/indicador/tr/territorio",
                {
                    params:{
                        ano: ano,
                        dependencia_id: 3,
                        ibge_id: id,
                        localizacao_id: 0,
                        serie_id: serie
                    },
                    headers:{
                        Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
                    }
                }
            )

            const publica = await axios.get(
                "https://api.qedu.org.br/v1/indicador/tr/territorio",
                {
                    params:{
                        ano: ano,
                        dependencia_id: 5,
                        ibge_id: id,
                        localizacao_id: 0,
                        serie_id: serie
                    },
                    headers:{
                        Authorization: "Bearer 9ZjZqSoJShZKQAZs0yRu048gKOjVNBEGe8y6KBND"
                    }
                }
            )

            const m = municipal.data?.data?.[0]
            const p = publica.data?.data?.[0]


            if (m) {
                aprMunicipal += Number(m.aprovados) || 0
                repMunicipal += Number(m.reprovados) || 0
                abaMunicipal += Number(m.abandonos) || 0
                contMunicipal++
            }

            if (p) {
                aprPublica += Number(p.aprovados) || 0
                repPublica += Number(p.reprovados) || 0
                abaPublica += Number(p.abandonos) || 0
                contPublica++
            }

        }

        res.json({

            taxa_aprmunicipal: contMunicipal ? aprMunicipal / contMunicipal : null,
            taxa_repmunicipal: contMunicipal ? repMunicipal / contMunicipal : null,
            taxa_abamunicipal: contMunicipal ? abaMunicipal / contMunicipal : null,

            taxa_aprpublica: contPublica ? aprPublica / contPublica : null,
            taxa_reppublica: contPublica ? repPublica / contPublica : null,
            taxa_abapublica: contPublica ? abaPublica / contPublica : null

        })

    } catch (erro) {

        console.log(erro.response?.data || erro.message)

        res.status(500).json({
            erro: "Erro ao buscar taxa"
        })

    }

})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando");
});