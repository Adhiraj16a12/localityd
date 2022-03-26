AFRAME.registerComponent("tour", {

  init: function() {
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createPlace();
  },
  
  tick: function() {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  
  hideEl: function(elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },
  
  createPlace: function() {
    const details = {
      garden: {
        position: { x: 20, y: -4.5, z: -5.5 },
        rotation: { x: 0, y: -90, z: 0 },
        src: "./assets/thumbnails/garden.jpg",
        title: "Garden",
        id: "garden"
  
      },
      main_gate: {
        position: { x: 4.6, y: -5.5, z: 25 },
        rotation: { x: 180, y: 0, z: 0 },
        src: "./assets/thumbnails/main.jpg",
        title: "Main Gate",
        id: "maingate"
      },
      home: {
        position: { x: -9, y: 34, z: -100 },
        rotation: { x: 0, y: 0, z: 0 },
        src: "./assets/thumbnails/home.png",
        title: "My Home",
        id: "home"
      }
    };

    for (var key in details) {
      const item = details[key];
      // Thubnail Element
      const thumbNail = this.createThumbNail(item);
      const title = this.createTitleEl(item);
      thumbNail.appendChild(title);
      this.placesContainer.appendChild(thumbNail);
    }
  },

  createThumbNail: function(item) {
    const entityEl = document.createElement("a-entity");
    const id = `place-${item.id}`;
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 3
    });
    entityEl.setAttribute("position", item.position);
    entityEl.setAttribute("rotation", item.rotation);
    entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },


  showView: function() {
    const { selectedPlace } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedPlace}.jpg`,
      color: "#fff"
    });
  },
});
