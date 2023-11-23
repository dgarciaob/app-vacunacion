export const vaccineData = [
  {
    id: 1,
    title: "BCG",
    description:
      "La vacunación contra tuberculosis es la medida de prevención primaria fundamental para prevenir enfermedades graves como tuberculosis meníngea y la forma miliar principalmente.",
    doses: 1,
    dosesDetail: [
      {
        primera: "Única",
      },
    ],
    defense: "Tuberculosis meníngea y miliar",
    idealDoseDates: [0],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 2,
    title: "Hepatitis B",
    description:
      "La vacuna previene la hepatitis B y sus complicaciones, todas las vacunas que hay en el mercado tienen antígeno proteico HBsAg (Antígeno de superficie de hepatitis B) purificado.",
    doses: 1,
    dosesDetail: [
      {
        primera: "Única",
      },
    ],
    defense: "Hepatitis B",
    idealDoseDates: [0],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 3,
    title: "Hexavalente DPat + VPI + Hib + HepB",
    description:
      "La vacuna hexavalente ayuda a la prevención y protección de múltiples enfermedades como difteria, hepatitis B, tétanos, tos ferina, poliomielitis e influenza tipo B.",
    doses: 4,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
        tercera: "Tercera",
        cuarta: "Cuarta",
      },
    ],
    defense:
      "Difteria, Hepatitis B, Tétanos, Tos Ferina, Poliomielitis e Influenza tipo B.",
    idealDoseDates: [2, 4, 6, 18],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 4,
    title: "DPT",
    description:
      "La vacuna DPT protege contra difteria, tos ferina y tétanos. Se aplica como refuerzo a los 4 años de edad.",
    doses: 1,
    dosesDetail: [
      {
        primera: "Refuerzo",
      },
    ],
    defense: "Difteria, Tétanos, Tos Ferina",
    idealDoseDates: [48],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 5,
    title: "Rotavirus",
    description:
      "Las vacunas contra rotavirus tienen eficacia contra las gastroenteritis (diarrea) de cualquier grado y contra las formas graves y complicaciones, disminuye el número de hospitalizaciones por gastroenteritis.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Diarrea",
    idealDoseDates: [2, 4],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 6,
    title: "Neumocócica conjugada",
    description:
      "La vacunación contra neumococo es la medida de prevención primaria fundamental para prevenir enfermedades como neumonía o meningitis.",
    doses: 4,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
        tercera: "Tercera",
        cuarta: "Refuerzo",
      },
    ],
    defense: "Neumonía, Meningitis",
    idealDoseDates: [2, 4, 6, 12],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 7,
    title: "Influenza",
    description:
      "La vacunación contra influenza es la medida de prevención primaria fundamental para prevenir la enfermedad y sus complicaciones como neumonía o la muerte por esta enfermedad.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Influenza, Neumonía",
    idealDoseDates: [6, 7],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 8,
    title: "Sarampión, Rubeóla, Parotiditis",
    description:
      "La vacuna previene la hepatitis B y sus complicaciones, todas las vacunas que hay en el mercado tienen antígeno proteico HBsAg (Antígeno de superficie de hepatitis B) purificado.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Hepatitis B",
    idealDoseDates: [12, 18],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 9,
    title: "Hepatitis A",
    description:
      "La vacuna previene la hepatitis A y sus complicaciones. Forma parte de un plan integral de prevención y control de las hepatitis virales.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Hepatitis A",
    idealDoseDates: [12, 18],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 10,
    title: "Varicela",
    description:
      "La vacunación contra varicela es la medida de prevención primaria fundamental para prevenir la enfermedad y sus complicaciones como infecciones de la piel, neumonía, choque o la muerte por esta enfermedad. Además de la protección individual, las personas vacunadas evitan la transmisión de está enfermedad y por lo tanto que otras personas se enfermen, sobre todo los que tienen mas riesgos de complicaciones por varicela y no se pueden vacunar como lactantes, embarazadas, personas con inmunosupresión u otros.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Varicela, Neumonía",
    idealDoseDates: [12, 15],
    category: "Vacunación en niños de 0 a 9 años",
  },
  {
    id: 11,
    title: "Covid-19",
    description:
      "La vacuna previene la hepatitis B y sus complicaciones, todas las vacunas que hay en el mercado tienen antígeno proteico HBsAg (Antígeno de superficie de hepatitis B) purificado.",
    doses: 1,
    dosesDetail: [
      {
        primera: "Única",
      },
    ],
    defense: "Covid-19",
    idealDoseDates: [6],
    category: "Vacunación en niños de 0 a 9 años",
  },
];

export const vaccineData2 = [
  {
    id: 11,
    title: "Virus del Papiloma humano",
    description:
      "La vacuna contra el virus del papiloma humano contiene una proteína del virus (proteína L1), no contiene el virus y por lo tanto no puede causar la enfermedad. Protege contra la mayoría de los cánceres cervicouterinos. Además puede proteger contra verrugas genitales, cáncer anal, vaginal y vulvar.",
    doses: 2,
    dosesDetail: [
      {
        primera: "Primera",
        segunda: "Segunda",
      },
    ],
    defense: "Papiloma Humano",
    idealDoseDates: [120, 144],
    category: "Vacunación en niños de 10 a 15 años",
  },
];
