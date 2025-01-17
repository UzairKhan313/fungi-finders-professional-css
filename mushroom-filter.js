// Getting all card with parents .mushroom guide.
const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const noResultsMessage = document.querySelector(".no-results-message");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  // You can use a data attribute if cards have unique IDs
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `mushroom-card-${mushroomId}`;
});

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name;

  currentFilters[filterType] = e.target.value;

  if (!document.startViewTransition) {
    filterCards();
    return;
  }
  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;

  cards.forEach((card) => {
    // we can also used getAttributes instead of dataset.
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchesSeason = currentFilters.season === season;

    const matchesEdible = currentFilters.edible === edible;

    if (
      (currentFilters.season === "all" || currentFilters.season === season) &&
      (currentFilters.edible === "all" || currentFilters.edible === edible)
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }
  });
  if (hasVisibleCards) {
    noResultsMessage.hidden = true;
  } else {
    noResultsMessage.hidden = false;
  }
}

// When Javascript is enabled on user browsers.
// When JS is not enalbed on user broweser we don't show the filter buttons.
function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
