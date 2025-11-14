$(document).ready(function () {
  // Fetch and render data
  $.getJSON("data.json", function (data) {
    renderCards(data);

    // --- Category Filter ---
    $("#categorySelect").on("change", function () {
      const selected = $(this).val();
      const filtered =
        selected === "all"
          ? data
          : data.filter((spot) => spot.category === selected);
      renderCards(filtered);
    });
  });

  // --- Render Function with Lazy Loading ---
  function renderCards(list) {
    const $container = $("#spotsContainer");
    $container.empty();

    list.forEach((spot) => {
      const [lat, lng] = spot.location;
      const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;

      // Lazy load image (or placeholder)
      const imgSrc = spot.imageUrl || "";
      const imgTag = imgSrc
        ? `<img src="${imgSrc}" alt="${spot.name}" loading="lazy">`
        : `<div class="img-placeholder">Image Coming Soon</div>`;

      const card = $(`
        <div class="card">
          ${imgTag}
          <div class="card-content">
            <h2>${spot.name}</h2>
            <p>${spot.description}</p>
            <a href="${mapLink}" target="_blank">View on Map</a>
          </div>
        </div>
      `);

      $container.append(card);
    });
  }
});
