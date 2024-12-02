import { ChartOptions, ChartData } from "chart.js";

export interface MenuItem {
  icon: string;
  label: string;
  items: SubMenuItem[];
}

export interface SubMenuItem {
  icon: string;
  label: string;
  href: string;
}

export const menuItems: MenuItem[] = [
  {
    label: "Ejercicio",
    icon: "Activity",
    items: [
      { label: "Historial", href: "/dashboard/exercise/history", icon: "History" },
      { label: "Empezar Entrenamiento", href: "/dashboard/exercise/start", icon: "Play" },
      { label: "Recomendaciones", href: "/dashboard/exercise/recommendations", icon: "Lightbulb" },
    ],
  },
  {
    label: "Alimentación",
    icon: "Utensils",
    items: [
      { label: "Historial", href: "/dashboard/nutrition/history", icon: "History" },
      { label: "Recetas", href: "/dashboard/nutrition/recipes", icon: "Book" },
      { label: "Agregar Comida", href: "/dashboard/nutrition/add", icon: "Plus" },
      { label: "Calculadora de Calorías", href: "/dashboard/nutrition/calculator", icon: "Calculator" },
    ],
  },
  {
    label: "Sueño",
    icon: "Moon",
    items: [
      { label: "Historial", href: "/dashboard/sleep/history", icon: "History" },
      { label: "Agregar Descanso", href: "/dashboard/sleep/add", icon: "BedDouble" },
    ],
  },
  {
    icon: "Settings",
    label: "Configuración",
    items: [
      { icon: "User", label: "Datos personales", href: "/dashboard/settings/profile" },
      { icon: "CreditCard", label: "Configuración de pago", href: "/dashboard/settings/payment" },
      { icon: "Paintbrush", label: "Personalización", href: "/dashboard/settings/personalization" },
    ],
  },
  {
    icon: "ShieldAlert",
    label: "Admin",
    items: [
      {icon: "User", label: "Administrar Usuarios", href: "/dashboard/admin/users"}
    ]
  },
];

export const chartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
    },
  },
};

export const generateChartData = (label: string, color: string): ChartData<"line"> => ({
  labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  datasets: [
    {
      label,
      data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      borderColor: color,
      backgroundColor: color.replace(")", ", 0.1)").replace("rgb", "rgba"),
      borderWidth: 2,
      pointBackgroundColor: color,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
    },
  ],
});