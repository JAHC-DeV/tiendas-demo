export function generateSlug(text: string): string {
    // Reemplazar caracteres especiales y espacios con guiones
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, ''); // Eliminar guiones al principio y al final
  
    return slug;
  }