require([
  "esri/identity/IdentityManager",
  "esri/layers/FeatureLayer",
  "esri/Map",
  "esri/views/MapView",
  "esri/WebMap",
], function (IdentityManager, FeatureLayer, Map, MapView, WebMap) {
  fetch("/get-token") // Endpoint to retrieve token from the server
    .then((response) => response.json())
    .then((data) => {
      IdentityManager.registerToken({
        server: "https://www.arcgis.com/sharing/rest",
        token: data.token,
      });
      
      const webmap = new WebMap({
        portalItem: {
          id: "524ac55db10f4f0a886c1d2d9bfb6634", // Replace with your web map ID
        },
      });

      const view = new MapView({
        container: "viewDiv",
        map: webmap,
        zoom: 19,
      });

      // const featureLayer = new FeatureLayer({
      //   url: "https://services3.arcgis.com/orXyBhVHhX3eGQES/arcgis/rest/services/Life_at_Levio/FeatureServer",
      //   authentication: IdentityManager,
      // });

      // const map = new Map({
      //   basemap: "topo-vector",
      //   layers: [featureLayer],
      // });

      // const view = new MapView({
      //   container: "viewDiv",
      //   map: map,
      //   zoom: 18,
      //   center: [-79.670609, 43.510718],
      // });

      // featureLayer.renderer = {
      //   type: "unique-value",
      //   field: "objectIdField", // Replace with the actual field distinguishing layers
      //   uniqueValueInfos: [
      //     {
      //       value: "1",
      //       symbol: {
      //         type: "simple-fill",
      //         color: "blue",
      //         outline: { color: "black", width: 1 },
      //       },
      //     },
      //     {
      //       value: "2",
      //       symbol: {
      //         type: "simple-fill",
      //         color: "yellow",
      //         outline: { color: "black", width: 1 },
      //       },
      //     },
      //   ],
      // };
    });
});
