export const gradeDict = {
  A: 4,
  'A-': 3.75,
  'A/B': 3.5,
  'B+': 3.25,
  B: 3,
  'B-': 2.75,
  'B/C': 2.5,
  'C+': 2.25,
  C: 2,
  'C-': 1.75,
  'C/D': 1.5,
  'D+': 1.25,
  D: 1,
  'D-': 0.75,
  'D/E': 0.5,
  'E+': 0.25,
  E: 0
}

export const gradeDictInvert = {
  0: 'E',
  1: 'D',
  2: 'C',
  3: 'B',
  4: 'A',
  3.75: 'A-',
  3.5: 'A/B',
  3.25: 'B+',
  2.75: 'B-',
  2.5: 'B/C',
  2.25: 'C+',
  1.75: 'C-',
  1.5: 'C/D',
  1.25: 'D+',
  0.75: 'D-',
  0.5: 'D/E',
  0.25: 'E+'
}

export default letterGrade => {
  return gradeDict[letterGrade]
}
