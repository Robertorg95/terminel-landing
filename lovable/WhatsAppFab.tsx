const waMsg = encodeURIComponent("Hola, me interesa agendar una consulta con Terminel Law Consulting.");

export default function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/526441216231?text=${waMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 w-14 h-14 rounded-full bg-[hsl(142,70%,49%)] text-foreground grid place-items-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      aria-label="WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 008.003.002C3.584.002.004 3.58.004 7.999c0 1.41.37 2.787 1.074 3.997L0 16l4.117-1.06a7.963 7.963 0 003.885 1c4.419 0 7.999-3.58 7.999-7.999a7.95 7.95 0 00-2.4-5.615z" />
        <path fill="hsl(142,70%,49%)" d="M11.885 9.74c-.201-.101-1.187-.586-1.37-.653-.184-.067-.317-.101-.45.101-.134.202-.518.652-.635.786-.117.134-.234.151-.435.05-.201-.101-.85-.314-1.62-1-.6-.534-1.004-1.194-1.12-1.395-.117-.201-.013-.31.088-.41.09-.089.201-.234.302-.351.101-.117.134-.201.201-.335.067-.134.034-.252-.017-.353-.05-.101-.45-1.086-.616-1.489-.162-.39-.328-.337-.45-.343l-.384-.007c-.134 0-.353.05-.537.252-.184.201-.702.686-.702 1.673s.719 1.942.819 2.077c.101.134 1.414 2.159 3.423 3.027.479.207.852.331 1.143.424.48.153.916.132 1.26.08.384-.058 1.187-.484 1.355-.952.168-.468.168-.868.118-.952-.05-.084-.184-.134-.385-.235z" />
      </svg>
    </a>
  );
}
