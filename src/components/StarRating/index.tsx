import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

/**
 * Componente StarRating
 * Muestra una calificación visual mediante estrellas, permitiendo estrellas parciales.
 * 
 * @param rating La calificación a mostrar.
 * @param max El número máximo de estrellas (por defecto 5).
 */
const StarRating = ({ rating, max = 5 }: StarRatingProps) => {
  /**
   * Calcula el porcentaje de relleno para una estrella específica.
   * 
   * @param starIndex El índice de la estrella (0-based).
   * @returns El porcentaje de relleno (0-100).
   */
  const getFillPercentage = (starIndex: number): number => {
    // Calcula cuánto de esta estrella debe estar rellena
    const starValue = rating - starIndex;
    // Asegura que el valor esté entre 0 y 1, luego multiplica por 100
    return Math.min(Math.max(starValue, 0), 1) * 100;
  };

  /**
   * Renderiza una única estrella.
   * Utiliza una técnica de superposición y clip-path para mostrar estrellas parciales.
   * 
   * @param starIndex El índice de la estrella a renderizar.
   * @returns El elemento JSX de la estrella.
   */
  const renderStar = (starIndex: number) => {
    const fillPercentage = getFillPercentage(starIndex);
    // Determina si la estrella está completamente vacía para optimizar el renderizado
    const isFullyEmpty = fillPercentage === 0;

    return (
      // Contenedor relativo para posicionar las estrellas superpuestas
      <div key={starIndex} className="relative w-8 h-8 mx-0.5">
        {/* Estrella de fondo (siempre visible, color atenuado) */}
        <Star
          aria-hidden="true" // Oculta a lectores de pantalla, la calificación se lee en el contenedor principal
          className="absolute w-full h-full text-muted-foreground"
          fill="currentColor" // Rellena el icono SVG con el color del texto
        />

        {/* Porción rellena (visible solo si fillPercentage > 0) */}
        {!isFullyEmpty && (
          // Div que recorta la estrella rellena según el porcentaje
          <div 
            className="absolute top-0 left-0 w-full h-full overflow-hidden"
            aria-hidden="true"
          >
            {/* Estrella rellena (color primario) */}
            <Star
              className="w-full h-full text-primary"
              // Aplica clip-path para mostrar solo la porción necesaria
              // inset(top right bottom left) - recorta desde la derecha
              style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
              fill="currentColor"
            />
          </div>
        )}
      </div>
    );
  };

  // Renderiza el contenedor principal y mapea sobre el número de estrellas para renderizar cada una
  return (
    <div 
      className="flex" // Alinea las estrellas horizontalmente
      role="img" // Indica que es una imagen o representación gráfica
      aria-label={`Calificación: ${rating} de ${max} estrellas`} // Etiqueta accesible para lectores de pantalla
    >
      {Array.from({ length: max }).map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;