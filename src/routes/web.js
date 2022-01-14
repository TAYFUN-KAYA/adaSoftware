import express from "express";

import connection from "../config/connectDB";





let router = express.Router();



let initWebRouters = (app) => {

  router.get("/", (req, res) => {
    res.render("index.ejs");
  });


  router.post("/rezervasyon", (req, res) => {
    var datas = req.body
    var tren_name = datas["Tren"]["Ad"]
    var yerlesim = datas["KisilerFarkliVagonlaraYerlestirilebilir"]
    var müsteri = datas["RezervasyonYapilacakKisiSayisi"]
    var vagonlar = datas["Tren"]["Vagonlar"]
    var yerlesme_sonuc = [];
    for (var i = 0; i < vagonlar.length; i++) {
      var vagon_kapasite = vagonlar[i]["Kapasite"]
      var vagon_doluluk = vagonlar[i]["DoluKoltukAdet"]
      var doluluk_oran = ((vagon_kapasite) * 70) / 100
      var vagon_name = vagonlar[i]["Ad"]
      console.log("doluluk_oran : ", doluluk_oran, "  vagon_doluluk : ", vagon_doluluk);
      if (doluluk_oran > vagon_doluluk) {
        var fark = doluluk_oran - vagon_doluluk
        if (yerlesim) {
          // farklı yerleşebilir
          if (fark >= müsteri) {
            // aynı vagona yerleşebilir
            if (yerlesme_sonuc.length == 0) {
              res.json({
                "RezervasyonYapilabilir": true,
                "YerlesimAyrinti": [
                  { "VagonAdi": vagonlar[i]["Ad"], "KisiSayisi": müsteri },
                ]
              }
              )
            } else {

              if (müsteri != 0) {
                yerlesme_sonuc.push({ "VagonAdi": vagon_name, "KisiSayisi": müsteri });
                müsteri = 0
              }

            }

          } else {
            var yerlesme_ihtimal = müsteri - fark
            if (yerlesme_ihtimal != 0) {
              yerlesme_sonuc.push({ "VagonAdi": vagon_name, "KisiSayisi": fark });
              müsteri = yerlesme_ihtimal;
            }
          }
        } else {
          // yerleşemez
          if (fark >= müsteri) {
            yerlesme_sonuc.push({ "VagonAdi": vagon_name, "KisiSayisi": müsteri });
          }
        }
      } else {
        console.log("Doluluk sıkıntı")
      }
    }
    if (yerlesme_sonuc.length == 0) {
      res.json({
        "RezervasyonYapilabilir": true,
        "YerlesimAyrinti": []
      })
    } else {
      var last_rez = {
        "RezervasyonYapilabilir": true,
        "YerlesimAyrinti": []
      }
      for (var i = 0; i < yerlesme_sonuc.length; i++) {
        last_rez.YerlesimAyrinti.push(yerlesme_sonuc[i]);
      }
      res.json(last_rez);
    }
  })



  router.get('*', function (req, res) {
    res.status(404).render("404page.ejs");
  });


  return app.use("/", router);
}

module.exports = initWebRouters;
