import * as cheerio from 'cheerio'
import getLetterFromGrade, { gradeDict } from './gradeDict'

/**
 * find subjects from simaster page HTML
 *
 * @param {*} html
 * @returns
 */

export const findSubjectsFromHTML = html => {
  const $ = cheerio.load(html)
  return $('table')
    .find('tbody tr')
    .map((i, tr) => {
      return $(tr)
        .find('td')
        .map((i, td) => $(td).text())
    })
    .toArray()
    .map(el => $(el).toArray())
    .slice(0, -1)
    .map(item => {
      const [name, classname] = item[2].split('Kelas:').map(item => item.trim())
      return {
        name,
        classname,
        code: item[1].trim(),
        sks: parseInt(item[3]),
        group: item[4].trim(),
        type: item[5].trim(),
        nth: item[6].trim(),
        grade: getLetterFromGrade(item[7].trim()),
        letterGrade: item[7].trim()
      }
    })
}

/**
 * Calculate GPA index of given array of subjects
 *
 * @param {*} subjects
 * @returns
 */
export const calculateGPA = subjects => {
  const totals = subjects.reduce(
    (acc, curr) => {
      if (curr.grade)
        return {
          sksxbobot: acc.sksxbobot + curr.sks * curr.grade,
          totalsks: acc.totalsks + curr.sks
        }
      return acc
    },
    { sksxbobot: 0, totalsks: 0 }
  )

  return (totals.sksxbobot / totals.totalsks).toFixed(2)
}

/**
 *
 * sum aLl sks of subjects array
 *
 * @param {*} subjects
 * @returns
 */
export const totalSKS = subjects => {
  return subjects.reduce((acc, curr) => {
    return acc + curr.sks
  }, 0)
}

/**
 * return count of subject and its total sks based on given type
 *
 * @param {*} type
 * @param {*} subjects
 * @returns
 */
export const countByType = (type, subjects) => {
  return subjects.reduce(
    (acc, curr) => {
      if (curr.type == type) {
        return {
          count: acc.count + 1,
          sks: acc.sks + curr.sks
        }
      }
      return acc
    },
    {
      count: 0,
      sks: 0
    }
  )
}

export const countByGrade = subjects => {
  let count = {}
  for (let key in gradeDict) {
    count[key] = 0
  }
  console.log(count)
  return subjects.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.letterGrade]: acc[curr.letterGrade] + 1
    }
  }, count)
}
