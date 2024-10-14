
export const calculatePeriod = (startDate:string  period: string): number => {
  const quoteDate = new Date(startDate)
  
  if (period === "Dia") {
    return 1
  }
  
  if (period === "Semana") {
    return 7
  }

  if (period === "Quincena") {
    return 14
  }

  if (period === "Mes") {
    return 1
  }

  if (period === "Bimestre") {
    dateEnd.setMonth(dateEnd.getMonth() + (quotesNumber * 2))
  }

  if (period === "Trimestre") {
    dateEnd.setMonth(dateEnd.getMonth() + (quotesNumber * 3))
  }

  if (period === "Semestre") {
    dateEnd.setMonth(dateEnd.getMonth() + (quotesNumber * 6))
  }

  if (period === "Año") {
    dateEnd.setFullYear(dateEnd.getFullYear() + quotesNumber)
  }

  // Formatear la fecha en formato "Día/Mes/Año"
  const day = dateEnd.getDate().toString().padStart(2, '0');
  const month = (dateEnd.getMonth() + 1).toString().padStart(2, '0'); // Los meses son de 0 a 11
  const year = dateEnd.getFullYear();
  
  return `${day}/${month}/${year}`;
  

}