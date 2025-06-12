  require([
        "esri/WebScene",
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/FeatureLayer",
        "esri/renderers/UniqueValueRenderer",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/identity/IdentityManager",
        "esri/Camera",
      ], (
        WebScene,
        Map,
        SceneView,
        FeatureLayer,
        UniqueValueRenderer,
        Graphic,
        GraphicsLayer,
        ArcGISIdentityManager,
        Camera
      ) => {
        /*
        const webscene = new WebScene({
          portalItem: {
            // autocasts as new PortalItem()
            id: "4a711462369c4334972dcd39b064d214",
            // id: "443d5d8c520c416e8d6d948b55f679d6",
          },
        });
*/

        const map = new Map({
          basemap: "gray",
        });

        const view = new SceneView({
          container: "viewDiv",
          map: map,
          // zoom: 10,
          //center: [-84.35714722, 33.944499207394635],
          camera: new Camera({
            position: { longitude: -84.35394, latitude: 33.90901, z: 1000 }, // Elevation controls zoom
            tilt: 65, // Angle of view
            heading: 330, // Direction (0 = North, 90 = East)
          }),
          environment: {
            lighting: {
              directShadowsEnabled: true,
            },
          },
        });

        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const gpsCoordinatesTA = [
          [-84.33586121, 33.994611584814606],
          [-84.33998108, 33.98265563205841],
          [-84.34616089, 33.970697997361626],
          [-84.35508728, 33.95816914781237],
          [-84.35714722, 33.944499207394635],
          [-84.35714722, 33.93025735136521],
          [-84.35783386, 33.91715274008259],
          [-84.35628891, 33.912843446552905],
          [-84.35624599, 33.91156130063172],
          [-84.35727596, 33.9104216],
          [-84.35916424, 33.90995859],
          [-84.36285496, 33.90999420720045],
          [-84.36783314, 33.910528446834526],
          [-84.36783314, 33.910528446834526],
          [-84.37032223, 33.91109829875324],
        ];
        const gpsCoordinatesTB = [
          [-84.3624258, 33.91503373454575],
          [-84.3621254, 33.91318178739876],
          [-84.36178207, 33.91132980000687],
          [-84.36165333, 33.90887229306915],
          [-84.36143875, 33.905488653089805],
          [-84.3610096, 33.90388582937925],
          [-84.35847759, 33.90285288257569],
          [-84.35607433, 33.90281726349717],
          [-84.35302734, 33.903137834668094],
        ];

        const wallSymbolA = {
          type: "line-3d",
          symbolLayers: [
            {
              type: "path",
              profile: "quad",
              material: {
                color: [0, 170, 227],
              },
              width: 5, // the width in m
              height: 60, // the height in m
              anchor: "bottom", // the vertical anchor is set to the lowest point of the wall
              profileRotation: "heading",
            },
          ],
        };

        const wallSymbolB = {
          type: "line-3d",
          symbolLayers: [
            {
              type: "path",
              profile: "quad",
              material: {
                color: [125, 160, 0],
              },
              width: 5, // the width in m
              height: 60, // the height in m
              anchor: "bottom", // the vertical anchor is set to the lowest point of the wall
              profileRotation: "heading",
            },
          ],
        };

        const featureLayer = new FeatureLayer({
          source: [
            {
              attributes: { type: "truckA" },
              geometry: {
                type: "polyline",
                paths: gpsCoordinatesTA,
              },
            },
            {
              attributes: { type: "truckB" },
              geometry: {
                type: "polyline",
                paths: gpsCoordinatesTB,
              },
            },
          ],
          objectIdField: "id",
          fields: [{ name: "type", type: "string" }],
        });

        const renderer = new UniqueValueRenderer({
          field: "type",
          uniqueValueInfos: [
            {
              value: "truckA",
              symbol: wallSymbolA,
            },
            {
              value: "truckB",
              symbol: wallSymbolB,
            },
          ],
        });

        featureLayer.renderer = renderer;
        map.add(featureLayer);

      });