declare module 'speckle' {
  interface CompactUri {
      prefix: Prefix;
      curi: string;
  }

  interface Prefix {
      name: string;
      prefix: string;
      uri(suffix: string): CompactUri;
  }

  function prefix(name: string, prefix: string): Prefix;

  interface Prefixes {
      [name: string]: Prefix;
  }

  class PrefixBuilder {
      prefixes: Prefixes;
      addValue(value: Value): PrefixBuilder;
      toSparql(sparql: string): string;
  }

  type Value = Variable | string | CompactUri;

  function v(vsc: Value): string;

  interface Variable {
      name: string;
  }

  function variable(name: string): Variable;

  interface Query {
      toSparql(): string;
      and(src: Value, pred: Value, obj: Value): Query;
  }

  interface Select {
      where(src: Value, pred: Value, obj: Value): Query;
  }

  function select(...variables: Variable[]): Select;

  interface RuleSet {
      toSparql(): string;
      rule(name: string): Rule;
  }

  interface Rule {
      when(src: Value, pred: Value, obj: Value): Construct;
  }

  interface Construct {
      and(src: Value, pred: Value, obj: Value): Construct;
      then(src: Value, pred: Value, obj: Value): RuleSet;
  }

  function rule(name: string): Rule;
}
