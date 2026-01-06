import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted py-8 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 ShopHub. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Carrito
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
