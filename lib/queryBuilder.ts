import {Variable} from './variable'
import {Value, v} from './value'
import {PrefixBuilder} from './prefix'

export interface Query {
  toSparql(): string
}

export interface Select {
  where(src: Value, pred: Value, obj: Value): Query
}

export function select(...variables:Variable[]): Select {
  let prefixBuilder = new PrefixBuilder()
  let query = 'SELECT '
  variables.forEach(function(variable){
    query += `?${variable.name} `
  })
  return {
    where: function(src: Value, pred: Value, obj: Value): Query {
      query = query + `WHERE {
 ${v(src)} ${v(pred)} ${v(obj)};
}`
      query = prefixBuilder.addValue(src).addValue(pred).addValue(obj).toSparql(query)
      return {
        toSparql(): string {
          return query
        }
      }
    }
  }
}
