<!--
# The Ahead-of-Time (AOT) Compiler
-->
# Ahead-of-Time (AOT) 컴파일러

An Angular application consists mainly of components and their HTML templates. Because the components and templates provided by Angular cannot be understood by the browser directly, Angular applications require a compilation process before they can run in a browser.

The Angular Ahead-of-Time (AOT) compiler converts your Angular HTML and TypeScript code into efficient JavaScript code during the build phase _before_ the browser downloads and runs that code. Compiling your application during the build process provides a faster rendering in the browser.

This guide explains how to specify metadata and apply available compiler options to compile your applications efficiently using the AOT compiler.

<div class="alert is-helpful"

  <a href="https://www.youtube.com/watch?v=kW9cJsvcsGo">Watch compiler author Tobias Bosch explain the Angular compiler</a> at AngularConnect 2016.

</div>

{@a overview}

<!--
## Angular compilation
-->
## Angular의 컴파일

<!--
Angular offers two ways to compile your application:
-->
Angular는 두 종류의 컴파일 방식을 제공합니다:

<!--
1. **_Just-in-Time_ (JIT)**, which compiles your app in the browser at runtime.
1. **_Ahead-of-Time_ (AOT)**, which compiles your app at build time.
-->
1. **_Just-in-Time_ (JIT)**: 브라우저에서 애플리케이션을 실행하면서 코드를 직접 컴파일하는 방식입니다.
1. **_Ahead-of-Time_ (AOT)**: 브라우저에 애플리케이션 코드를 보내기 전에 미리 컴파일하는 방식입니다.

JIT compilation is the default when you run the [`ng build`](cli/build) (build only) or [`ng serve`](cli/serve)  (build and serve locally) CLI commands: 

<code-example language="sh" class="code-shell">
  ng build
  ng serve
</code-example>

{@a compile}

For AOT compilation, include the `--aot` option with the `ng build` or `ng serve` command:

<code-example language="sh" class="code-shell">
  ng build --aot
  ng serve --aot
</code-example>

<div class="alert is-helpful">

The `ng build` command with the `--prod` meta-flag (`ng build --prod`) compiles with AOT by default.

See the [CLI command reference](cli) and [Building and serving Angular apps](guide/build) for more information.

</div>

{@a why-aot}

<!--
## Why compile with AOT?
-->
## 왜 AOT 컴파일 하나요?

<!--
*Faster rendering*

With AOT, the browser downloads a pre-compiled version of the application.
The browser loads executable code so it can render the application immediately, without waiting to compile the app first.
-->
*렌더링 시간 단축*

AOT 방식으로 컴파일하면 브라우저가 미리 컴파일된 애플리케이션 코드를 내려받습니다.
그런데 이 코드는 브라우저가 직접 실행할 수 있도록 변환된 코드이기 때문에, 브라우저는 코드를 컴파일하는 과정없이 바로 실행할 수 있습니다.

<!--
*Fewer asynchronous requests*

The compiler _inlines_ external HTML templates and CSS style sheets within the application JavaScript,
eliminating separate ajax requests for those source files.
-->

<!--
*Smaller Angular framework download size*

There's no need to download the Angular compiler if the app is already compiled.
The compiler is roughly half of Angular itself, so omitting it dramatically reduces the application payload.
-->
*내려받는 Angular 프레임워크 크기 감소*

AOT 컴파일 방식을 사용하면 클라이언트가 애플리케이션 코드를 내려받기 전에 미리 애플리케이션을 빌드하기 때문에 클라이언트에서 Angular 컴파일러를 내려받지 않아도 됩니다.
Angular 컴파일러의 크기는 Angular 프레임워크 전체 크기의 반 정도를 차지합니다. AOT 컴파일 방식을 사용하면 이 용량을 내려받지 않아도 됩니다.

<!--
*Detect template errors earlier*

The AOT compiler detects and reports template binding errors during the build step
before users can see them.
-->
*템플릿 에러를 미리 검증*

AOT 컴파일러를 사용하면 실행 단계가 아니라 빌드 단계에서 템플릿 바인딩 에러를 검사합니다.

<!--
*Better security*

AOT compiles HTML templates and components into JavaScript files long before they are served to the client.
With no templates to read and no risky client-side HTML or JavaScript evaluation,
there are fewer opportunities for injection attacks.
-->
*더 나은 보안*

AOT 컴파일 방식을 사용하면 HTML 템플릿과 컴포넌트 코드가 모두 JavaScript로 변환되어 클라이언트에 제공됩니다.
그래서 클라이언트에 존재하는 HTML 문서나 JavaScript가 없기 떄문에, 인젝션 공격의 기회를 상당수 차단할 수 있습니다.

## Controlling app compilation

When you use the Angular AOT compiler, you can control your app compilation in two ways:

* By providing template compiler options in the `tsconfig.json` file.

      For more information, see [Angular template compiler options](#compiler-options).

* By [specifying Angular metadata](#metadata-aot).


{@a metadata-aot}
## Specifying Angular metadata

Angular metadata tells Angular how to construct instances of your application classes and interact with them at runtime.
The Angular **AOT compiler** extracts **metadata** to interpret the parts of the application that Angular is supposed to manage.

You can specify the metadata with **decorators** such as `@Component()` and `@Input()` or implicitly in the constructor declarations of these decorated classes.

<!--
In the following example, the `@Component()` metadata object and the class constructor tell Angular how to create and display an instance of `TypicalComponent`.
-->
아래 코드에서 `@Component()`에 지정하는 메타데이터 객체와 클래스 생성자는 Angular가 `TypicalComponent`의 인스턴스를 어떻게 생성하고 처리해야 할지 지정하는 용도로 사용됩니다.

```typescript
@Component({
  selector: 'app-typical',
  template: '<div>A typical component for {{data.name}}</div>'
)}
export class TypicalComponent {
  @Input() data: TypicalData;
  constructor(private someService: SomeService) { ... }
}
```

<!--
The Angular compiler extracts the metadata _once_ and generates a _factory_ for `TypicalComponent`.
When it needs to create a `TypicalComponent` instance, Angular calls the factory, which produces a new visual element, bound to a new instance of the component class with its injected dependency.
-->
이 코드를 Angular 컴파일러가 처리하면 메타데이터를 추출해서 `TypicalComponent`에 대한 _팩토리_ 를 만듭니다.
그러면 `TypicalComponent`의 인스턴스가 필요한 시점에 Angular가 팩토리를 실행해서 인스턴스를 생성하며, 이렇게 생성된 인스턴스를 의존성으로 주입합니다.

<!--
## Metadata restrictions
-->
## 메타데이터의 제약사항

<!--
You write metadata in a _subset_ of TypeScript that must conform to the following general constraints:
-->
메타데이터는 TypeScript의 _하위 집합(subset)_ 이며 보통 다음과 같은 제약사항이 있습니다:

<!--
1. Limit [expression syntax](#expression-syntax) to the supported subset of JavaScript.
2. Only reference exported symbols after [code folding](#folding).
3. Only call [functions supported](#supported-functions) by the compiler.
4. Decorated and data-bound class members must be public.
-->
1. JavaScript 문법 중 [표현식(expression syntax)](#expression-syntax)은 일부만 사용할 수 있습니다.
2. [코드를 폴딩](#folding)한 이후에 존재하는 심볼만 참조할 수 있습니다.
3. 컴파일러가 지원하는 [일부 함수](#supported-functions)만 사용할 수 있습니다.
4. 데코레이터가 사용되거나 데이터 바인딩되는 클래스 멤버는 public으로 지정되어야 합니다.

<!--
The next sections elaborate on these points.
-->
이 내용에 대해 자세하게 알아봅시다.

<!--
## How AOT works
-->
## AOT가 동작하는 방식

<!--
It helps to think of the AOT compiler as having two phases: a code analysis phase in which it simply records a representation of the source; and a code generation phase in which the compiler's `StaticReflector` handles the interpretation as well as places restrictions on what it interprets.
-->
AOT 컴파일러의 동작은 두 단계로 나누어 보는 것이 이해하기 편합니다. 첫 번째 단계는 코드를 분석하는 단계이며, 두 번째 단계는 Angular 컴파일러 내부의 `StaticReflector`를 사용해서 코드를 생성하는 단계입니다.

<!--
## Phase 1: analysis
-->
## 1단계: 분석

<!--
The TypeScript compiler does some of the analytic work of the first phase. It emits the `.d.ts` _type definition files_ with type information that the AOT compiler needs to generate application code.

At the same time, the AOT **_collector_** analyzes the metadata recorded in the Angular decorators and outputs metadata information in **`.metadata.json`** files, one per `.d.ts` file.

You can think of `.metadata.json` as a diagram of the overall structure of a decorator's metadata, represented as an [abstract syntax tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree).
-->
첫번째 단계에서는 TypeScript 컴파일러가 분석과 관련된 작업을 합니다. TypeScript 컴파일러가 코드를 컴파일하고 나면 _타입 정의 파일_ 인 `.d.ts` 파일이 생성되며, 이 정보는 이후에 AOT 컴파일러가 애플리케이션 코드를 생성할 때 사용합니다.

그리고 이 때 AOT **_콜렉터(collector)_**가 각 `.d.ts` 파일에 있는 Angular 데코레이터의 메타데이터를 분석하고 분석한 내용을 **`.metadata.json`** 파일로 생성합니다.

`.metadata.json` 파일은 데코레이터의 메타데이터를 나타내는 청사진이라고도 볼 수 있습니다. [추상 구문 트리(abstract syntax tree, AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)를 참고하세요.

<div class="alert is-helpful">

<!--
Angular's [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts)
describes the JSON format as a collection of TypeScript interfaces.
-->
Angular가 생성하는 [schema.ts](https://github.com/angular/angular/blob/master/packages/compiler-cli/src/metadata/schema.ts) 파일은 TypeScript 인터페이스를 JSON 형식으로 기술하는 파일입니다.

</div>

{@a expression-syntax}
<!--
### Expression syntax
-->
### 표현식 (Expression syntax)

<!--
The _collector_ only understands a subset of JavaScript.
Define metadata objects with the following limited syntax:
-->
Angular _콜렉터(collector)_ 는 JavaScript의 하위집합이며 JavaScript 문법 중 일부만 처리할 수 있습니다.
그래서 메타데이터에는 다음과 같은 문법만 허용됩니다:

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Syntax</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>Literal object </td>
    <td><code>{cherry: true, apple: true, mincemeat: false}</code></td>
  </tr>
  <tr>
    <td>Literal array  </td>
    <td><code>['cherries', 'flour', 'sugar']</code></td>
  </tr>
  <tr>
    <td>Spread in literal array</td>
    <td><code>['apples', 'flour', ...the_rest]</code></td>
  </tr>
   <tr>
    <td>Calls</td>
    <td><code>bake(ingredients)</code></td>
  </tr>
   <tr>
    <td>New</td>
    <td><code>new Oven()</code></td>
  </tr>
   <tr>
    <td>Property access</td>
    <td><code>pie.slice</code></td>
  </tr>
   <tr>
    <td>Array index</td>
    <td><code>ingredients[0]</code></td>
  </tr>
   <tr>
    <td>Identity reference</td>
    <td><code>Component</code></td>
  </tr>
   <tr>
    <td>A template string</td>
    <td><code>`pie is ${multiplier} times better than cake`</code></td>
   <tr>
    <td>Literal string</td>
    <td><code>pi</code></td>
  </tr>
   <tr>
    <td>Literal number</td>
    <td><code>3.14153265</code></td>
  </tr>
   <tr>
    <td>Literal boolean</td>
    <td><code>true</code></td>
  </tr>
   <tr>
    <td>Literal null</td>
    <td><code>null</code></td>
  </tr>
   <tr>
    <td>Supported prefix operator </td>
    <td><code>!cake</code></td>
  </tr>
   <tr>
    <td>Supported binary operator </td>
    <td><code>a+b</code></td>
  </tr>
   <tr>
    <td>Conditional operator</td>
    <td><code>a ? b : c</code></td>
  </tr>
   <tr>
    <td>Parentheses</td>
    <td><code>(a+b)</code></td>
  </tr>
</table>


<!--
If an expression uses unsupported syntax, the _collector_ writes an error node to the `.metadata.json` file. The compiler later reports the error if it needs that
piece of metadata to generate the application code.
-->
만약 이 목록에 해당되지 않은 표현식이 사용되면 _콜렉터_ 가 처리할 수 없기 때문에 에러기 발생하며 `.metadata.json` 파일도 정상적으로 생성되지 않습니다. 결국 애플리케이션 코드를 빌드할 때 에러가 발생합니다.

<div class="alert is-helpful">

<!--
 If you want `ngc` to report syntax errors immediately rather than produce a `.metadata.json` file with errors, set the `strictMetadataEmit` option in `tsconfig`.
-->
`.metadata.json` 파일에 에러를 출력하는 대신 `ngc`에서 직접 문법 에러가 발생하게 하려면 `tsconfig` 옵션에 `strictMetadataEmit` 옵션을 다음과 같이 설정하세요.

```
  "angularCompilerOptions": {
   ...
   "strictMetadataEmit" : true
 }
 ```

<!--
Angular libraries have this option to ensure that all Angular `.metadata.json` files are clean and it is a best practice to do the same when building your own libraries.
-->
Angular가 제공하는 라이브러리는 모두 이 옵션을 사용하기 때문에 Angular에서 제공하는 모든 `.metadata.json` 파일은 에러 없이 깔끔한 상태입니다. 커스텀 라이브러리를 만드는 경우에도 활용해 보세요.

</div>

{@a function-expression}
{@a arrow-functions}
<!--
### No arrow functions
-->
### 화살표 함수는 사용할 수 없습니다.

<!--
The AOT compiler does not support [function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)
and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), also called _lambda_ functions.
-->
AOT 컴파일러는 [함수 표현식](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function)과 [화살표 함수 (람다 함수)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)를 지원하지 않습니다.

<!--
Consider the following component decorator:
-->
다음과 같은 컴포넌트 데코레이터가 있다고 합시다:

```typescript
@Component({
  ...
  providers: [{provide: server, useFactory: () => new Server()}]
})
```

<!--
The AOT _collector_ does not support the arrow function, `() => new Server()`, in a metadata expression.
It generates an error node in place of the function.
-->
이 코드에는 AOT _콜렉터_ 가 지원하지 않는 화살표 함수가 `() => new Server()`와 같이 사용되었습니다.
그러면 이 코드는 제대로 변환되지 못하고 에러 노드로 처리됩니다.

<!--
When the compiler later interprets this node, it reports an error that invites you to turn the arrow function into an _exported function_.
-->
그리고 이후에 컴파일러가 이 노드를 처리할 때 에러가 발생하기 때문에, 이 화살표 함수는 _export가 사용된 함수_ 로 변경되어야 합니다.

<!--
You can fix the error by converting to this:
-->
이 에러는 다음과 같이 수정하면 해결할 수 있습니다:

```typescript
export function serverFactory() {
  return new Server();
}

@Component({
  ...
  providers: [{provide: server, useFactory: serverFactory}]
})
```

<!--
Beginning in version 5, the compiler automatically performs this rewriting while emitting the `.js` file.
-->
Angular v5 버전 초기에는 화살표 함수를 변환하는 과정을 컴파일러가 직접 처리했었습니다.

{@a function-calls}
<!--
### Limited function calls
-->
### 함수 실행 제한

<!--
The _collector_ can represent a function call or object creation with `new` as long as the syntax is valid. The _collector_ only cares about proper syntax.

But beware. The compiler may later refuse to generate a call to a _particular_ function or creation of a _particular_ object.
The compiler only supports calls to a small set of functions and will use `new` for only a few designated classes. These functions and classes are in a table of [below](#supported-functions).
-->
_콜렉터_ 는 함수를 실행하거나 `new` 키워드로 객체를 생성할 수 있습니다. 하지만 _콜렉터_ 를 사용할 때는 문법이 맞는지 주의해야 합니다.

하지만 또 주의할 점이 있습니다. 콜렉터가 JavaScript 구문을 처리한 이후라도 AOT 컴파일러가 이 코드를 다시 처리하면서 _특정_ 함수나 _특정_ 객체가 생성되는 것은 처리하지 않을 수도 있습니다.
AOT 컴파일러는 콜렉터와 다르게 일부 함수를 실행하거나 일부 클래스만 `new` 키워드로 생성할 수 있습니다. 컴파일러가 지원하는 목록은 [여기](#supported-functions)를 참고하세요.

{@a folding}
<!--
### Folding
-->
### 폴딩 (Folding)

{@a exported-symbols}

<!--
The compiler can only resolve references to **_exported_** symbols.
Fortunately, the _collector_ enables limited use of non-exported symbols through _folding_.

The _collector_ may be able to evaluate an expression during collection and record the result in the `.metadata.json` instead of the original expression.

For example, the _collector_ can evaluate the expression `1 + 2 + 3 + 4` and replace it with the result, `10`.

This process is called _folding_. An expression that can be reduced in this manner is _foldable_.
-->
AOT 컴파일러는 **_export_** 키워드가 사용된 심볼만 참조할 수 있습니다.
하지만 다행히도 _콜렉터_ 는 _폴딩_ 이라는 것을 통해 `export` 키워드가 사용되지 않은 심볼도 제한적으로 참조할 수 있습니다.

_콜렉터_ 는 콜렉션 단계에서 표현식을 평가하고 그 결과를 `.metadata.json` 파일에 기록하는데, 이 때 원래 코드를 약간 변형해서 기록합니다.

예를 들어 _콜렉터_ 가 `1 + 2 + 3 + 4` 라는 표현식을 평가하고 나면 `.metadata.json` 파일에는 이 내용을 `10`으로 기록합니다.

이 과정을 _폴딩(folding)_ 이라고 합니다. 그리고 이 과정이 적용될 수 있는 코드를 _폴딩할 수 있는(foldable)_ 코드라고 합니다.

{@a var-declaration}
<!--
The collector can evaluate references to
module-local `const` declarations and initialized `var` and `let` declarations, effectively removing them from the `.metadata.json` file.

Consider the following component definition:
-->
콜렉터는 모듈 파일에 로컬 변수로 선언된 `const`, `var`, `let` 변수들을 참조할 수 있으며, 코드가 처리되어 `.metadata.json` 파일에 기록될 때는 이 코드가 모두 폴딩되면서 제거됩니다.

다음과 같이 정의된 컴포넌트가 있다고 합시다:

```typescript
const template = '<div>{{hero.name}}</div>';

@Component({
  selector: 'app-hero',
  template: template
})
export class HeroComponent {
  @Input() hero: Hero;
}
```

<!--
The compiler could not refer to the `template` constant because it isn't exported.

But the _collector_ can _fold_ the `template` constant into the metadata definition by inlining its contents.
The effect is the same as if you had written:
-->
컴파일러는 이 코드에 선언된 `template` 변수를 참조할 수 없습니다. 왜냐하면 이 변수에 `export` 키워드가 사용되지 않았기 때문입니다.

하지만 _콜렉터_ 는 `template` 변수를 _폴딩_ 해서 컴포넌트 메타데이터 안으로 집어넣을 수 있습니다.
결과적으로 이 코드는 아래 코드와 같습니다:

```typescript
@Component({
  selector: 'app-hero',
  template: '<div>{{hero.name}}</div>'
})
export class HeroComponent {
  @Input() hero: Hero;
}
```

<!--
There is no longer a reference to `template` and, therefore, nothing to trouble the compiler when it later interprets the _collector's_ output in `.metadata.json`.

You can take this example a step further by including the `template` constant in another expression:
-->
이 코드에는 `template`이라는 변수가 없으며, _콜렉터_ 가 생성한 `.metadata.json` 파일을 사용하는 컴파일러도 정상적으로 실행됩니다.

그리고 이와 비슷한 방식으로 다음과 같은 코드도 정상적으로 처리됩니다:

```typescript
const template = '<div>{{hero.name}}</div>';

@Component({
  selector: 'app-hero',
  template: template + '<div>{{hero.title}}</div>'
})
export class HeroComponent {
  @Input() hero: Hero;
}
```
<!--
The _collector_ reduces this expression to its equivalent _folded_ string:
-->
이 코드의 템플릿을 _콜렉터_ 가 처리하고 나면 다음과 같이 _폴딩 된_ 문자열로 변환됩니다:

`'<div>{{hero.name}}</div><div>{{hero.title}}</div>'`.

<!--
#### Foldable syntax
-->
#### 폴딩할 수 있는 문법

<!--
The following table describes which expressions the _collector_ can and cannot fold:
-->
_콜렉터_ 가 폴딩할 수 있는 문법에는 어떤 것들이 있는지 확인해 보세요:

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Syntax</th>
    <th>Foldable</th>
  </tr>
  <tr>
    <td>Literal object </td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Literal array  </td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Spread in literal array</td>
    <td>no</td>
  </tr>
   <tr>
    <td>Calls</td>
    <td>no</td>
  </tr>
   <tr>
    <td>New</td>
    <td>no</td>
  </tr>
   <tr>
    <td>Property access</td>
    <td>yes, if target is foldable</td>
  </tr>
   <tr>
    <td>Array index</td>
    <td> yes, if target and index are foldable</td>
  </tr>
   <tr>
    <td>Identity reference</td>
    <td>yes, if it is a reference to a local</td>
  </tr>
   <tr>
    <td>A template with no substitutions</td>
    <td>yes</td>
  </tr>
   <tr>
    <td>A template with substitutions</td>
    <td>yes, if the substitutions are foldable</td>
  </tr>
   <tr>
    <td>Literal string</td>
    <td>yes</td>
  </tr>
   <tr>
    <td>Literal number</td>
    <td>yes</td>
  </tr>
   <tr>
    <td>Literal boolean</td>
    <td>yes</td>
  </tr>
   <tr>
    <td>Literal null</td>
    <td>yes</td>
  </tr>
   <tr>
    <td>Supported prefix operator </td>
    <td>yes, if operand is foldable</td>
  </tr>
   <tr>
    <td>Supported binary operator </td>
    <td>yes, if both left and right are foldable</td>
  </tr>
   <tr>
    <td>Conditional operator</td>
    <td>yes, if condition is foldable </td>
  </tr>
   <tr>
    <td>Parentheses</td>
    <td>yes, if the expression is foldable</td>
  </tr>
</table>


<!--
If an expression is not foldable, the collector writes it to `.metadata.json` as an [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) for the compiler to resolve.
-->
표현식이 폴딩될 수 없는 경우에는 콜렉터가 이 코드를 [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) 형식으로 `.metadata.json`에 생성하며, 이 결과물은 이후에 AOT 컴파일러가 처리합니다.

<!--
## Phase 2: code generation
-->
## 2단계: 코드 생성

<!--
The _collector_ makes no attempt to understand the metadata that it collects and outputs to `.metadata.json`. It represents the metadata as best it can and records errors when it detects a metadata syntax violation.
-->
_콜렉터_ 는 메타데이터를 이해하는 것이 아니라 메타데이터를 찾아서 `.metadata.json`에 모으는 역할만 합니다. 그리고 이 과정에서 메타데이터에 사용된 문법에 오류가 있는지도 검사합니다.

<!--
It's the compiler's job to interpret the `.metadata.json` in the code generation phase.
-->
`.mdtadata.json` 파일을 해석해서 코드를 생성하는 것은 컴파일러의 역할입니다.

<!--
The compiler understands all syntax forms that the _collector_ supports, but it may reject _syntactically_ correct metadata if the _semantics_ violate compiler rules.

The compiler can only reference _exported symbols_.

Decorated component class members must be public. You cannot make an `@Input()` property private or internal.

Data bound properties must also be public.
-->
컴파일러는 _콜렉터_ 가 처리할 수 있었던 문법을 모두 처리할 수 있지만, 콜렉터와 다르게 메타데이터가 _문법적으로_ 컴파일 규칙에 어긋나면 에러를 발생시킵니다.

컴파일러는 _export 키워드가 사용된 심볼_ 만 참조할 수 있습니다.

컴포넌트 클래스 멤버에 데코레이터가 사용되면 이 멤버는 반드시 public이어야 합니다. private 프로퍼티에는 `@Input()` 데코레이터를 사용할 수 없습니다.

데이터 바인딩으로 연결된 프로퍼티도 반드시 public이어야 합니다.

<!--
```typescript
// BAD CODE - title is private
@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>'
})
export class AppComponent {
  private title = 'My App'; // Bad
}
```
-->
```typescript
// 잘못된 코드 - title이 private으로 지정되었습니다.
@Component({
  selector: 'app-root',
  template: '<h1>{{title}}</h1>'
})
export class AppComponent {
  private title = 'My App'; // 오류
}
```

{@a supported-functions}
<!--
Most importantly, the compiler only generates code to create instances of certain classes, support certain decorators, and call certain functions from the following lists.
-->
컴파일러가 생성할 수 있는 클래스는 일부 목록으로 제한되며, 지원하는 데코레이터도 제한되어 있고, 실행할 수 있는 함수도 제한되어 있습니다. 다음 목록을 참고하세요.


<!--
### New instances
-->
### 인스턴스 생성

<!--
The compiler only allows metadata that create instances of the class `InjectionToken` from `@angular/core`.
-->
AOT 컴파일러는 `@angular/core`의 `InjectionToken`으로 등록된 클래스의 인스턴스만 생성할 수 있습니다.

<!--
### Annotations/Decorators
-->
### 어노테이션/데코레이터

<!--
The compiler only supports metadata for these Angular decorators.
-->
컴파일러는 다음 목록에 해당하는 Angular 데코레이터만 지원합니다.

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Decorator</th>
    <th>Module</th>
  </tr>
    <tr>
    <td><code>Attribute</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Component</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ContentChild</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ContentChildren</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Directive</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Host</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>HostBinding</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>HostListner</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Inject</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Injectable</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Input</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>NgModule</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Optional</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Output</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Pipe</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>Self</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>SkipSelf</code></td>
    <td><code>@angular/core</code></td>
  </tr>
  <tr>
    <td><code>ViewChild</code></td>
    <td><code>@angular/core</code></td>
  </tr>

  </table>



<!--
### Macro-functions and macro-static methods
-->
### 매크로 함수와 정적 매크로 메소드

<!--
The compiler also supports _macros_ in the form of functions or static
methods that return an expression.

For example, consider the following function:
-->
AOT 컴파일러는 함수 형태로 된 _매크로_ 와 표현식을 반환하는 정적 메소드도 지원합니다.

다음과 같은 함수가 정의되어 있다고 합시다:

```typescript
export function wrapInArray<T>(value: T): T[] {
  return [value];
}
```

<!--
You can call the `wrapInArray` in a metadata definition because it returns the value of an expression that conforms to the compiler's restrictive JavaScript subset.
-->
그러면 이 `wrapInArray` 함수를 메타데이터 정의에 사용할 수 있습니다. 왜냐하면 이 함수는 컴파일러가 처리할 수 있는 형태의 결과물을 반환하기 때문입니다.

<!--
You might use  `wrapInArray()` like this:
-->
그래서 이 함수는 이렇게 사용할 수 있습니다:

```typescript
@NgModule({
  declarations: wrapInArray(TypicalComponent)
})
export class TypicalModule {}
```

<!--
The compiler treats this usage as if you had written:
-->
이 코드는 다음 코드와 동일하게 처리됩니다.

```typescript
@NgModule({
  declarations: [TypicalComponent]
})
export class TypicalModule {}
```

<!--
The collector is simplistic in its determination of what qualifies as a macro
function; it can only contain a single `return` statement.
-->
콜렉터가 처리할 수 있는 매크로 함수의 기준은 단순합니다. 함수가 `return` 키워드로 무언가를 반환하기만 하면 됩니다.

<!--
The Angular [`RouterModule`](api/router/RouterModule) exports two macro static methods, `forRoot` and `forChild`, to help declare root and child routes.
Review the [source code](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")
for these methods to see how macros can simplify configuration of complex [NgModules](guide/ngmodules).
-->
Angular [`RouterModule`](api/router/RouterModule)가 제공하는 메소드 중 애플리케이션의 최상위 라우팅을 정의하는 `forRoot`와 자식 라우팅을 정의하는 `forChild`가 정적 매크로 메소드입니다.
[NgModules](guide/ngmodules) 설정이 복잡할 때 매크로 함수를 활용하면 이 설정을 좀 더 간단하게 작성할 수 있습니다. [소스 코드](https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L139 "RouterModule.forRoot source code")를 보면서 내용을 확인해 보세요.

{@a metadata-rewriting}

<!--
### Metadata rewriting
-->
### 메타데이터 재구축

<!--
The compiler treats object literals containing the fields `useClass`, `useValue`, `useFactory`, and `data` specially. The compiler converts the expression initializing one of these fields into an exported variable, which replaces the expression. This process of rewriting these expressions removes all the restrictions on what can be in them because
the compiler doesn't need to know the expression's value&mdash;it just needs to be able to generate a reference to the value.
-->
AOT 컴파일러는 메타데이터에 사용된 `useClass`, `useValue`, `useFactory`에 사용된 객체 리터럴과 `data` 프로퍼티를 처리해서 각각 `export`로 지정된 변수로 변환합니다. 컴파일러는 이 필드에 사용된 표현식 자체를 알 필요는 없습니다. 단순하게 결과만 참조하면 됩니다.

<!--
You might write something like:
-->
다음과 같은 코드가 있다고 합시다:

```typescript
class TypicalServer {

}

@NgModule({
  providers: [{provide: SERVER, useFactory: () => TypicalServer}]
})
export class TypicalModule {}
```

<!--
Without rewriting, this would be invalid because lambdas are not supported and `TypicalServer` is not exported.

To allow this, the compiler automatically rewrites this to something like:
-->
메타데이터 재구축 과정이 없다면 이 코드는 처리되지 않습니다. 왜나하면 AOT 컴파일러는 람다 함수를 지원하지 않으며, `TypicalServer` 클래스도 `export`로 지정되지 않았기 때문입니다.

하지만 이 코드는 메타데이터 재구축 과정을 거치면서 다음과 같이 변환됩니다:

```typescript
class TypicalServer {

}

export const ɵ0 = () => new TypicalServer();

@NgModule({
  providers: [{provide: SERVER, useFactory: ɵ0}]
})
export class TypicalModule {}
```

<!--
This allows the compiler to generate a reference to `ɵ0` in the
factory without having to know what the value of `ɵ0` contains.
-->
그러면 AOT 컴파일러가 클래스를 직접 참조하지 않고 `ɵ0` 팩토리를 참조합니다.

<!--
The compiler does the rewriting during the emit of the `.js` file. This doesn't rewrite the `.d.ts` file, however, so TypeScript doesn't recognize it as being an export. Thus, it does not pollute the ES module's exported API.
-->
메타데이터 재구축 과정은 컴파일러가 `.js` 파일을 생성할 때 이루어집니다. 그리고 이 과정은 `.d.ts` 파일을 수정하는 것이 아니기 때문에 TypeScript에서는 이 과정에 생성된 `export` 변수를 인식할 수 없습니다. 결과적으로 모듈이 제공하던 API도 영향을 받지 않습니다.

## Metadata errors

The following are metadata errors you may encounter, with explanations and suggested corrections.

[Expression form not supported](#expression-form-not-supported)<br>
[Reference to a local (non-exported) symbol](#reference-to-a-local-symbol)<br>
[Only initialized variables and constants](#only-initialized-variables)<br>
[Reference to a non-exported class](#reference-to-a-non-exported-class)<br>
[Reference to a non-exported function](#reference-to-a-non-exported-function)<br>
[Function calls are not supported](#function-calls-not-supported)<br>
[Destructured variable or constant not supported](#destructured-variable-not-supported)<br>
[Could not resolve type](#could-not-resolve-type)<br>
[Name expected](#name-expected)<br>
[Unsupported enum member name](#unsupported-enum-member-name)<br>
[Tagged template expressions are not supported](#tagged-template-expressions-not-supported)<br>
[Symbol reference expected](#symbol-reference-expected)<br>

<hr>

<h3 class="no-toc">Expression form not supported</h3>

The compiler encountered an expression it didn't understand while evaluating Angular metadata.

Language features outside of the compiler's [restricted expression syntax](#expression-syntax)
can produce this error, as seen in the following example:

```
// ERROR
export class Fooish { ... }
...
const prop = typeof Fooish; // typeof is not valid in metadata
  ...
  // bracket notation is not valid in metadata
  { provide: 'token', useValue: { [prop]: 'value' } };
  ...
```

You can use `typeof` and bracket notation in normal application code.
You just can't use those features within expressions that define Angular metadata.

Avoid this error by sticking to the compiler's [restricted expression syntax](#expression-syntax)
when writing Angular metadata
and be wary of new or unusual TypeScript features.

<hr>

{@a reference-to-a-local-symbol}
<h3 class="no-toc">Reference to a local (non-exported) symbol</h3>

<div class="alert is-helpful">

_Reference to a local (non-exported) symbol 'symbol name'. Consider exporting the symbol._

</div>

The compiler encountered a referenced to a locally defined symbol that either wasn't exported or wasn't initialized.

Here's a `provider` example of the problem.

```
// ERROR
let foo: number; // neither exported nor initialized

@Component({
  selector: 'my-component',
  template: ... ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}
```
The compiler generates the component factory, which includes the `useValue` provider code, in a separate module. _That_ factory module can't reach back to _this_ source module to access the local (non-exported) `foo` variable.

You could fix the problem by initializing `foo`.

```
let foo = 42; // initialized
```

The compiler will [fold](#folding) the expression into the provider as if you had written this.

```
  providers: [
    { provide: Foo, useValue: 42 }
  ]
```

Alternatively, you can fix it by exporting `foo` with the expectation that `foo` will be assigned at runtime when you actually know its value.

```
// CORRECTED
export let foo: number; // exported

@Component({
  selector: 'my-component',
  template: ... ,
  providers: [
    { provide: Foo, useValue: foo }
  ]
})
export class MyComponent {}
```

Adding `export` often works for variables referenced in metadata such as `providers` and `animations` because the compiler can generate _references_ to the exported variables in these expressions. It doesn't need the _values_ of those variables.

Adding `export` doesn't work when the compiler needs the _actual value_
in order to generate code.
For example, it doesn't work for the `template` property.

```
// ERROR
export let someTemplate: string; // exported but not initialized

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}
```

The compiler needs the value of the `template` property _right now_ to generate the component factory.
The variable reference alone is insufficient.
Prefixing the declaration with `export` merely produces a new error, "[`Only initialized variables and constants can be referenced`](#only-initialized-variables)".

<hr>

{@a only-initialized-variables}
<h3 class="no-toc">Only initialized variables and constants</h3>

<div class="alert is-helpful">

_Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler._

</div>

The compiler found a reference to an exported variable or static field that wasn't initialized.
It needs the value of that variable to generate code.

The following example tries to set the component's `template` property to the value of
the exported `someTemplate` variable which is declared but _unassigned_.

```
// ERROR
export let someTemplate: string;

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}
```

You'd also get this error if you imported `someTemplate` from some other module and neglected to initialize it there.

```
// ERROR - not initialized there either
import { someTemplate } from './config';

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}
```

The compiler cannot wait until runtime to get the template information.
It must statically derive the value of the `someTemplate` variable from the source code
so that it can generate the component factory, which includes
instructions for building the element based on the template.

To correct this error, provide the initial value of the variable in an initializer clause _on the same line_.

```
// CORRECTED
export let someTemplate = '<h1>Greetings from Angular</h1>';

@Component({
  selector: 'my-component',
  template: someTemplate
})
export class MyComponent {}
```

<hr>

<h3 class="no-toc">Reference to a non-exported class</h3>

<div class="alert is-helpful">

_Reference to a non-exported class <class name>. Consider exporting the class._

</div>

Metadata referenced a class that wasn't exported.

For example, you may have defined a class and used it as an injection token in a providers array
but neglected to export that class.

```
// ERROR
abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...
```

Angular generates a class factory in a separate module and that
factory [can only access exported classes](#exported-symbols).
To correct this error, export the referenced class.

```
// CORRECTED
export abstract class MyStrategy { }

  ...
  providers: [
    { provide: MyStrategy, useValue: ... }
  ]
  ...
```
<hr>

<h3 class="no-toc">Reference to a non-exported function</h3>

Metadata referenced a function that wasn't exported.

For example, you may have set a providers `useFactory` property to a locally defined function that you neglected to export.

```
// ERROR
function myStrategy() { ... }

  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  ...
```

Angular generates a class factory in a separate module and that
factory [can only access exported functions](#exported-symbols).
To correct this error, export the function.

```
// CORRECTED
export function myStrategy() { ... }

  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy }
  ]
  ...
```
<hr>

{@a function-calls-not-supported}
<h3 class="no-toc">Function calls are not supported</h3>

<div class="alert is-helpful">

_Function calls are not supported. Consider replacing the function or lambda with a reference to an exported function._

</div>

The compiler does not currently support [function expressions or lambda functions](#function-expression).
For example, you cannot set a provider's `useFactory` to an anonymous function or arrow function like this.

```
// ERROR
  ...
  providers: [
    { provide: MyStrategy, useFactory: function() { ... } },
    { provide: OtherStrategy, useFactory: () => { ... } }
  ]
  ...
```
You also get this error if you call a function or method in a provider's `useValue`.
```
// ERROR
import { calculateValue } from './utilities';

  ...
  providers: [
    { provide: SomeValue, useValue: calculateValue() }
  ]
  ...
```

To correct this error, export a function from the module and refer to the function in a `useFactory` provider instead.

<code-example linenums="false">
// CORRECTED
import { calculateValue } from './utilities';

export function myStrategy() { ... }
export function otherStrategy() { ... }
export function someValueFactory() {
  return calculateValue();
}
  ...
  providers: [
    { provide: MyStrategy, useFactory: myStrategy },
    { provide: OtherStrategy, useFactory: otherStrategy },
    { provide: SomeValue, useFactory: someValueFactory }
  ]
  ...
</code-example>

<hr>

{@a destructured-variable-not-supported}
<h3 class="no-toc">Destructured variable or constant not supported</h3>

<div class="alert is-helpful">

_Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring._

</div>

The compiler does not support references to variables assigned by [destructuring](https://www.typescriptlang.org/docs/handbook/variable-declarations.html#destructuring).

For example, you cannot write something like this:

<code-example linenums="false">
// ERROR
import { configuration } from './configuration';

// destructured assignment to foo and bar
const {foo, bar} = configuration;
  ...
  providers: [
    {provide: Foo, useValue: foo},
    {provide: Bar, useValue: bar},
  ]
  ...
</code-example>

To correct this error, refer to non-destructured values.

<code-example linenums="false">
// CORRECTED
import { configuration } from './configuration';
  ...
  providers: [
    {provide: Foo, useValue: configuration.foo},
    {provide: Bar, useValue: configuration.bar},
  ]
  ...
</code-example>

<hr>

<h3 class="no-toc">Could not resolve type</h3>

The compiler encountered a type and can't determine which module exports that type.

This can happen if you refer to an ambient type.
For example, the `Window` type is an ambient type declared in the global `.d.ts` file.

You'll get an error if you reference it in the component constructor,
which the compiler must statically analyze.

```
// ERROR
@Component({ })
export class MyComponent {
  constructor (private win: Window) { ... }
}
```
TypeScript understands ambient types so you don't import them.
The Angular compiler does not understand a type that you neglect to export or import.

In this case, the compiler doesn't understand how to inject something with the `Window` token.

Do not refer to ambient types in metadata expressions.

If you must inject an instance of an ambient type,
you can finesse the problem in four steps:

1. Create an injection token for an instance of the ambient type.
1. Create a factory function that returns that instance.
1. Add a `useFactory` provider with that factory function.
1. Use `@Inject` to inject the instance.

Here's an illustrative example.

<code-example linenums="false">
// CORRECTED
import { Inject } from '@angular/core';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

@Component({
  ...
  providers: [
    { provide: WINDOW, useFactory: _window }
  ]
})
export class MyComponent {
  constructor (@Inject(WINDOW) private win: Window) { ... }
}
</code-example>

The `Window` type in the constructor is no longer a problem for the compiler because it
uses the `@Inject(WINDOW)` to generate the injection code.

Angular does something similar with the `DOCUMENT` token so you can inject the browser's `document` object (or an abstraction of it, depending upon the platform in which the application runs).

<code-example linenums="false">
import { Inject }   from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({ ... })
export class MyComponent {
  constructor (@Inject(DOCUMENT) private doc: Document) { ... }
}
</code-example>
<hr>

<h3 class="no-toc">Name expected</h3>

The compiler expected a name in an expression it was evaluating.
This can happen if you use a number as a property name as in the following example.

```
// ERROR
provider: [{ provide: Foo, useValue: { 0: 'test' } }]
```

Change the name of the property to something non-numeric.

```
// CORRECTED
provider: [{ provide: Foo, useValue: { '0': 'test' } }]
```

<hr>

<h3 class="no-toc">Unsupported enum member name</h3>

Angular couldn't determine the value of the [enum member](https://www.typescriptlang.org/docs/handbook/enums.html)
that you referenced in metadata.

The compiler can understand simple enum values but not complex values such as those derived from computed properties.

<code-example linenums="false">
// ERROR
enum Colors {
  Red = 1,
  White,
  Blue = "Blue".length // computed
}

  ...
  providers: [
    { provide: BaseColor,   useValue: Colors.White } // ok
    { provide: DangerColor, useValue: Colors.Red }   // ok
    { provide: StrongColor, useValue: Colors.Blue }  // bad
  ]
  ...
</code-example>

Avoid referring to enums with complicated initializers or computed properties.

<hr>

{@a tagged-template-expressions-not-supported}
<h3 class="no-toc">Tagged template expressions are not supported</h3>

<div class="alert is-helpful">

_Tagged template expressions are not supported in metadata._

</div>

The compiler encountered a JavaScript ES2015 [tagged template expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_template_literals) such as,
```
// ERROR
const expression = 'funky';
const raw = String.raw`A tagged template ${expression} string`;
 ...
 template: '<div>' + raw + '</div>'
 ...
```
[`String.raw()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw)
is a _tag function_ native to JavaScript ES2015.

The AOT compiler does not support tagged template expressions; avoid them in metadata expressions.

<hr>

<h3 class="no-toc">Symbol reference expected</h3>

The compiler expected a reference to a symbol at the location specified in the error message.

This error can occur if you use an expression in the `extends` clause of a class.

<!--

Chuck: After reviewing your PR comment I'm still at a loss. See [comment there](https://github.com/angular/angular/pull/17712#discussion_r132025495).

-->

{@a binding-expression-validation}
  ## Phase 3: binding expression validation

  In the validation phase, the Angular template compiler uses the TypeScript compiler to validate the
  binding expressions in templates. Enable this phase explicitly by adding the compiler
  option `"fullTemplateTypeCheck"` in the `"angularCompilerOptions"` of the project's `tsconfig.json` (see
  [Angular Compiler Options](#compiler-options)).

  Template validation produces error messages when a type error is detected in a template binding
  expression, similar to how type errors are reported by the TypeScript compiler against code in a `.ts`
  file.

  For example, consider the following component:

  ```typescript
  @Component({
    selector: 'my-component',
    template: '{{person.addresss.street}}'
  })
  class MyComponent {
    person?: Person;
  }
  ```

  This will produce the following error:

  ```
  my.component.ts.MyComponent.html(1,1): : Property 'addresss' does not exist on type 'Person'. Did you mean 'address'?
  ```

  The file name reported in the error message, `my.component.ts.MyComponent.html`, is a synthetic file
  generated by the template compiler that holds contents of the `MyComponent` class template.
  Compiler never writes this file to disk. The line and column numbers are relative to the template string
  in the `@Component` annotation of the class, `MyComponent` in this case. If a component uses
  `templateUrl` instead of `template`, the errors are reported in the HTML file referenced by the
  `templateUrl` instead of a synthetic file.

  The error location is the beginning of the text node that contains the interpolation expression with
  the error. If the error is in an attribute binding such as `[value]="person.address.street"`, the error
  location is the location of the attribute that contains the error.

  The validation uses the TypeScript type checker and the options supplied to the TypeScript compiler to control
  how detailed the type validation is. For example, if the `strictTypeChecks` is specified, the error  ```my.component.ts.MyComponent.html(1,1): : Object is possibly 'undefined'``` is reported as well as the above error message.

  ### Type narrowing

  The expression used in an `ngIf` directive is used to narrow type unions in the Angular
  template compiler, the same way the `if` expression does in TypeScript. For example, to avoid
  `Object is possibly 'undefined'` error in the template above, modify it to only emit the
  interpolation if the value of `person` is initialized as shown below:

  ```typescript
  @Component({
    selector: 'my-component',
    template: '<span *ngIf="person"> {{person.addresss.street}} </span>'
  })
  class MyComponent {
    person?: Person;
  }
  ```

  Using `*ngIf` allows the TypeScript compiler to infer that the `person` used in the
  binding expression will never be `undefined`.

  #### Custom `ngIf` like directives

  Directives that behave like `*ngIf` can declare that they want the same treatment by including
  a static member marker that is a signal to the template compiler to treat them
  like `*ngIf`. This static member for `*ngIf` is:

  ```typescript
    public static ngIfUseIfTypeGuard: void;
  ```

  This declares that the input property `ngIf` of the `NgIf` directive should be treated as a
  guard to the use of its template, implying that the template will only be instantiated if
  the `ngIf` input property is true.


  ### Non-null type assertion operator

  Use the [non-null type assertion operator](guide/template-syntax#non-null-assertion-operator)
  to suppress the `Object is possibly 'undefined'` error when it is inconvenient to use
  `*ngIf` or when some constraint in the component ensures that the expression is always
  non-null when the binding expression is interpolated.

  In the following example, the `person` and `address` properties are always set together,
  implying that `address` is always non-null if `person` is non-null. There is no convenient
  way to describe this constraint to TypeScript and the template compiler, but the error
  is suppressed in the example by using `address!.street`.

  ```typescript
  @Component({
    selector: 'my-component',
    template: '<span *ngIf="person"> {{person.name}} lives on {{address!.street}} </span>'
  })
  class MyComponent {
    person?: Person;
    address?: Address;

    setData(person: Person, address: Address) {
      this.person = person;
      this.address = address;
    }
  }
  ```

  The non-null assertion operator should be used sparingly as refactoring of the component
  might break this constraint.

  In this example it is recommended to include the checking of `address`
  in the `*ngIf`as shown below:

  ```typescript
  @Component({
    selector: 'my-component',
    template: '<span *ngIf="person && address"> {{person.name}} lives on {{address.street}} </span>'
  })
  class MyComponent {
    person?: Person;
    address?: Address;

    setData(person: Person, address: Address) {
      this.person = person;
      this.address = address;
    }
  }
  ```

  ### Disabling type checking using `$any()`

  Disable checking of a binding expression by surrounding the expression
  in a call to the [`$any()` cast pseudo-function](guide/template-syntax).
  The compiler treats it as a cast to the `any` type just like in TypeScript when a `<any>`
  or `as any` cast is used.

  In the following example, the error `Property addresss does not exist` is suppressed
  by casting `person` to the `any` type.

  ```typescript
  @Component({
    selector: 'my-component',
    template: '{{$any(person).addresss.street}}'
  })
  class MyComponent {
    person?: Person;
  }
  ```

{@a tsconfig-extends}
## Configuration inheritance with extends
Similar to TypeScript Compiler, Angular Compiler also supports `extends` in the `tsconfig.json` on `angularCompilerOptions`. A tsconfig file can inherit configurations from another file using the `extends` property.
 The `extends` is a top level property parallel to `compilerOptions` and `angularCompilerOptions`. 
 The configuration from the base file are loaded first, then overridden by those in the inheriting config file.
 Example:
```json
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "experimentalDecorators": true,
    ...
  },
  "angularCompilerOptions": {
    "fullTemplateTypeCheck": true,
    "preserveWhitespaces": true,
    ...
  }
}
```
 More information about tsconfig extends can be found in the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

{@a compiler-options}
## Angular template compiler options

The template compiler options are specified as members of the `"angularCompilerOptions"` object in the `tsconfig.json` file. Specify template compiler options along with the options supplied to the TypeScript compiler as shown here:

    ```json
    {
      "compilerOptions": {
        "experimentalDecorators": true,
                  ...
      },
      "angularCompilerOptions": {
        "fullTemplateTypeCheck": true,
        "preserveWhitespaces": true,
                  ...
      }
  }
  ```

The following section describes the Angular's template compiler options.

### *enableResourceInlining*
This option instructs the compiler to replace the `templateUrl` and `styleUrls` property in all `@Component` decorators with inlined contents in `template` and `styles` properties.
When enabled, the `.js` output of `ngc` will have no lazy-loaded `templateUrl` or `styleUrls`.

### *skipMetadataEmit*

This option tells the compiler not to produce `.metadata.json` files.
The option is `false` by default.

`.metadata.json` files contain information needed by the template compiler from a `.ts`
file that is not included in the `.d.ts` file produced by the TypeScript compiler. This information contains,
for example, the content of annotations (such as a component's template), which TypeScript
emits to the `.js` file but not to the `.d.ts` file.

This option should be set to `true` if you are using TypeScript's `--outFile` option, because the metadata files
are not valid for this style of TypeScript output. It is not recommended to use `--outFile` with
Angular. Use a bundler, such as [webpack](https://webpack.js.org/), instead.

This option can also be set to `true` when using factory summaries because the factory summaries
include a copy of the information that is in the `.metadata.json` file.

### *strictMetadataEmit*

This option tells the template compiler to report an error to the `.metadata.json`
file if `"skipMetadataEmit"` is `false`. This option is `false` by default. This should only be used when `"skipMetadataEmit"` is `false` and `"skipTemplateCodeGen"` is `true`.

This option is intended to validate the `.metadata.json` files emitted for bundling with an `npm` package. The validation is strict and can emit errors for metadata that would never produce an error when used by the template compiler. You can choose to suppress the error emitted by this option for an exported symbol by including `@dynamic` in the comment documenting the symbol.

It is valid for `.metadata.json` files to contain errors. The template compiler reports these errors
if the metadata is used to determine the contents of an annotation. The metadata
collector cannot predict the symbols that are designed for use in an annotation, so it will preemptively
include error nodes in the metadata for the exported symbols. The template compiler can then use the error
nodes to report an error if these symbols are used. If the client of a library intends to use a symbol in an annotation, the template compiler will not normally report
this until the client uses the symbol. This option allows detecting these errors during the build phase of
the library and is used, for example, in producing Angular libraries themselves.

### *skipTemplateCodegen*

This option tells the compiler to suppress emitting `.ngfactory.js` and `.ngstyle.js` files. When set,
this turns off most of the template compiler and disables reporting template diagnostics.
This option can be used to instruct the
template compiler to produce `.metadata.json` files for distribution with an `npm` package while
avoiding the production of `.ngfactory.js` and `.ngstyle.js` files that cannot be distributed to
`npm`.

### *strictInjectionParameters*

When set to `true`, this options tells the compiler to report an error for a parameter supplied
whose injection type cannot be determined. When this option is not provided or is `false`, constructor parameters of classes marked with `@Injectable` whose type cannot be resolved will
produce a warning.

*Note*: It is recommended to change this option explicitly to `true` as this option will default to `true` in the future.

### *flatModuleOutFile*

When set to `true`, this option tells the template compiler to generate a flat module
index of the given file name and the corresponding flat module metadata. Use this option when creating
flat modules that are packaged similarly to `@angular/core` and `@angular/common`. When this option
is used, the `package.json` for the library should refer
to the generated flat module index instead of the library index file. With this
option only one `.metadata.json` file is produced, which contains all the metadata necessary
for symbols exported from the library index. In the generated `.ngfactory.js` files, the flat
module index is used to import symbols that includes both the public API from the library index
as well as shrowded internal symbols.

By default the `.ts` file supplied in the `files` field is assumed to be the library index.
If more than one `.ts` file is specified, `libraryIndex` is used to select the file to use.
If more than one `.ts` file is supplied without a `libraryIndex`, an error is produced. A flat module
index `.d.ts` and `.js` will be created with the given `flatModuleOutFile` name in the same
location as the library index `.d.ts` file. For example, if a library uses the
`public_api.ts` file as the library index of the module, the `tsconfig.json` `files` field
would be `["public_api.ts"]`. The `flatModuleOutFile` options could then be set to, for
example `"index.js"`, which produces `index.d.ts` and  `index.metadata.json` files. The
library's `package.json`'s `module` field would be `"index.js"` and the `typings` field
would be `"index.d.ts"`.

### *flatModuleId*

This option specifies the preferred module id to use for importing a flat module.
References generated by the template compiler will use this module name when importing symbols
from the flat module.
This is only meaningful when `flatModuleOutFile` is also supplied. Otherwise the compiler ignores
this option.

### *generateCodeForLibraries*

This option tells the template compiler to generate factory files (`.ngfactory.js` and `.ngstyle.js`)
for `.d.ts` files with a corresponding `.metadata.json` file. This option defaults to
`true`. When this option is `false`, factory files are generated only for `.ts` files.

This option should be set to `false` when using factory summaries.

### *fullTemplateTypeCheck*

This option tells the compiler to enable the [binding expression validation](#binding-expression-validation)
phase of the template compiler which uses TypeScript to validate binding expressions.

This option is `false` by default.

*Note*: It is recommended to set this to `true` because this option will default to `true` in the future.

### *annotateForClosureCompiler*

This option tells the compiler to use [Tsickle](https://github.com/angular/tsickle) to annotate the emitted
JavaScript with [JSDoc](http://usejsdoc.org/) comments needed by the
[Closure Compiler](https://github.com/google/closure-compiler). This option defaults to `false`.

### *annotationsAs*

Use this option to modify how the Angular specific annotations are emitted to improve tree-shaking. Non-Angular
annotations and decorators are unaffected. Default is `static fields`.

<style>
  td, th {vertical-align: top}
</style>

<table>
  <tr>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>decorators</code></td>
    <td>Leave the decorators in place. This makes compilation faster. TypeScript will emit calls to the __decorate helper.  Use <code>--emitDecoratorMetadata</code> for runtime reflection.  However, the resulting code will not properly tree-shake.</td>
  </tr>
  <tr>
    <td><code>static fields</code></td>
    <td>Replace decorators with a static field in the class. Allows advanced tree-shakers like
    <a href="https://github.com/google/closure-compiler">Closure compiler</a> to remove unused classes.</td>
  </tr>
  </table>


### *trace*

This tells the compiler to print extra information while compiling templates.

### *enableLegacyTemplate*

Use of  the `<template>` element was deprecated starting in Angular 4.0 in favor of using
`<ng-template>` to avoid colliding with the DOM's element of the same name. Setting this option to
`true` enables the use of the deprecated `<template>` element. This option
is `false` by default. This option might be required by some third-party Angular libraries.

### *disableExpressionLowering*

The Angular template compiler transforms code that is used, or could be used, in an annotation
to allow it to be imported from template factory modules. See
[metadata rewriting](#metadata-rewriting) for more information.

Setting this option to `false` disables this rewriting, requiring the rewriting to be
done manually.

### *disableTypeScriptVersionCheck*

When `true`, this option tells the compiler not to check the TypeScript version.
The compiler will skip checking and will not error out when an unsupported version of TypeScript is used.
Setting this option to `true` is not recommended because unsupported versions of TypeScript might have undefined behaviour.

This option is `false` by default.

### *preserveWhitespaces*

This option tells the compiler whether to remove blank text nodes from compiled templates.
As of v6, this option is `false` by default, which results in smaller emitted template factory modules.

### *allowEmptyCodegenFiles*

Tells the compiler to generate all the possible generated files even if they are empty. This option is
`false` by default. This is an option used by the Bazel build rules and is needed to simplify
how Bazel rules track file dependencies. It is not recommended to use this option outside of the Bazel
rules.

