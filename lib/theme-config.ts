/**
 * Configuración centralizada de colores del tema
 * Este archivo define los colores para tema claro y oscuro en formato HSL
 * Puedes modificar estos valores para personalizar la paleta de colores de la aplicación
 */

export type ThemeColors = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
};

/**
 * Tema claro: Zinc (tonos grises suaves) + Cian primary
 */
export const lightTheme: ThemeColors = {
  background: '0 0% 100%', // Blanco puro
  foreground: '240 10% 3.9%', // Zinc-950
  card: '0 0% 100%', // Blanco
  cardForeground: '240 10% 3.9%', // Zinc-950
  popover: '0 0% 100%', // Blanco
  popoverForeground: '240 10% 3.9%', // Zinc-950
  primary: '189 94% 43%', // Cian-500
  primaryForeground: '0 0% 100%', // Blanco
  secondary: '240 4.8% 95.9%', // Zinc-100
  secondaryForeground: '240 5.9% 10%', // Zinc-900
  muted: '240 4.8% 95.9%', // Zinc-100
  mutedForeground: '240 3.8% 46.1%', // Zinc-500
  accent: '240 4.8% 95.9%', // Zinc-100
  accentForeground: '240 5.9% 10%', // Zinc-900
  destructive: '0 84.2% 60.2%', // Red-500
  destructiveForeground: '0 0% 100%', // Blanco
  border: '240 5.9% 90%', // Zinc-200
  input: '240 5.9% 90%', // Zinc-200
  ring: '189 94% 43%', // Cian-500
};

/**
 * Tema oscuro: Slate (tonos azul-gris) + Cian primary
 */
export const darkTheme: ThemeColors = {
  background: '215 28% 17%', // Slate-800
  foreground: '210 40% 98%', // Slate-50
  card: '215 28% 17%', // Slate-800
  cardForeground: '210 40% 98%', // Slate-50
  popover: '222.2 47.4% 11.2%', // Slate-900
  popoverForeground: '210 40% 98%', // Slate-50
  primary: '189 94% 43%', // Cian-500
  primaryForeground: '222.2 47.4% 11.2%', // Slate-900
  secondary: '215 25% 27%', // Slate-700
  secondaryForeground: '210 40% 98%', // Slate-50
  muted: '215 25% 27%', // Slate-700
  mutedForeground: '215 16% 65%', // Slate-400
  accent: '215 25% 27%', // Slate-700
  accentForeground: '210 40% 98%', // Slate-50
  destructive: '0 62.8% 30.6%', // Red-900
  destructiveForeground: '210 40% 98%', // Slate-50
  border: '215 20% 35%', // Slate-600
  input: '215 20% 35%', // Slate-600
  ring: '189 94% 43%', // Cian-500
};

/**
 * Aplica los colores del tema a las variables CSS
 */
export function applyTheme(theme: ThemeColors, isDark: boolean = false) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  
  root.style.setProperty('--background', theme.background);
  root.style.setProperty('--foreground', theme.foreground);
  root.style.setProperty('--card', theme.card);
  root.style.setProperty('--card-foreground', theme.cardForeground);
  root.style.setProperty('--popover', theme.popover);
  root.style.setProperty('--popover-foreground', theme.popoverForeground);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-foreground', theme.primaryForeground);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--secondary-foreground', theme.secondaryForeground);
  root.style.setProperty('--muted', theme.muted);
  root.style.setProperty('--muted-foreground', theme.mutedForeground);
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-foreground', theme.accentForeground);
  root.style.setProperty('--destructive', theme.destructive);
  root.style.setProperty('--destructive-foreground', theme.destructiveForeground);
  root.style.setProperty('--border', theme.border);
  root.style.setProperty('--input', theme.input);
  root.style.setProperty('--ring', theme.ring);
}
