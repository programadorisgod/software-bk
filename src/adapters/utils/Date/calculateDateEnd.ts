
export const calculateDateEnd = (date: Date, period: string, quotesNumber: number): string => {

    const dateEnd = new Date(date)
    
    if (period === "Dia") {
      dateEnd.setDate(dateEnd.getDate() + quotesNumber)
    }
    
    if (period === "Semana") {
      dateEnd.setDate(dateEnd.getDate() + (quotesNumber * 7))
    }

    if (period === "Quincena") {
      dateEnd.setDate(dateEnd.getDate() + (quotesNumber * 14))
    }

    if (period === "Mes") {
      dateEnd.setMonth(dateEnd.getMonth() + quotesNumber)
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