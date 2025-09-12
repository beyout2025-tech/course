document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const coursesGrid = document.getElementById('courses-grid');
  let courseCards = document.querySelectorAll('.course-card');

  // Helper function to update the list of cards after a filter/search
  const updateCourseCards = () => {
    courseCards = document.querySelectorAll('.course-card');
  };

  // Function to apply both search and filter
  const applyFiltersAndSearch = () => {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

    courseCards.forEach(card => {
      const cardText = card.textContent.toLowerCase();
      const cardFilter = card.classList;

      const matchesSearch = cardText.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || cardFilter.contains(activeFilter);

      // Show the card only if it matches both search and filter criteria
      if (matchesSearch && matchesFilter) {
        card.style.display = '';
        card.setAttribute('data-aos', 'fade-up');
      } else {
        card.style.display = 'none';
        card.removeAttribute('data-aos');
      }
    });

    // Re-initialize AOS to animate only the visible elements
    AOS.refresh();
  };

  // Search functionality
  searchInput.addEventListener('keyup', applyFiltersAndSearch);

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      applyFiltersAndSearch();
    });
  });

  // Initial application of filters and search
  applyFiltersAndSearch();
});
