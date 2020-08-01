import { recalculateTagStatistics } from "../models/vote"

export const recalculateStatistics = async (data: any, context: any) => {
  await recalculateTagStatistics(context.params.tag)
  console.log(`${context.params.tag} recalculated`)
}
