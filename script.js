function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.tab-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Set the clicked button as active
    event.currentTarget.classList.add('active');
}
