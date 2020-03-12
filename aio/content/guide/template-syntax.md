<!--
# Template syntax
-->
# 템플릿 문법

<style>
  h4 {font-size: 17px !important; text-transform: none !important;}
  .syntax { font-family: Consolas, 'Lucida Sans', Courier, sans-serif; color: black; font-size: 85%; }
  h4 .syntax { font-size: 100%; }
</style>

<!--
The Angular application manages what the user sees and can do, achieving this through the interaction of a component class instance (the *component*) and its user-facing template.
-->
Angular 애플리케이션은 사용자의 행동에 반응하면서 화면에 데이터를 표시하는데, 이 과정은 컴포넌트 클래스와 템플릿이 상호작용하면서 이루어집니다.

<!--
You may be familiar with the component/template duality from your experience with model-view-controller (MVC) or model-view-viewmodel (MVVM).
In Angular, the component plays the part of the controller/viewmodel, and the template represents the view.
-->
MVC(모델-뷰-컨트롤러)나 MVVM(모델-뷰-뷰모델) 구조를 다뤄봤다면 컴포넌트와 템플릿의 관계가 이미 익숙할 수도 있습니다.
Angular에서는 컴포넌트가 컨트롤러나 뷰모델 역할을 하고, 템플릿이 뷰 역할을 합니다.

<!--
This page is a comprehensive technical reference to the Angular template language.
It explains basic principles of the template language and describes most of the syntax that you'll encounter elsewhere in the documentation.
-->
이 문서에서는 Angular 템플릿 문법의 기술적인 부분을 종합적으로 다룹니다.
템플릿 문법의 기초부터 시작해서 다른 가이드 페이지에서도 등장하는 템플릿 문법 대부분을 이 문서에서 다룹니다.

<!--
Many code snippets illustrate the points and concepts, all of them available
in the <live-example title="Template Syntax Live Code"></live-example>.
-->

템플릿 문법의 개념을 확실하게 이해하기 위해 많은 코드를 살펴볼 것이며,
이 문서에서 설명하는 코드는 <live-example title="템플릿 문법 라이브 코딩"></live-example> 에서 확인하거나 다운받을 수 있습니다.

{@a html}
<!--
## HTML in templates
-->
## 템플릿과 HTML

<!--
HTML is the language of the Angular template.
Almost all HTML syntax is valid template syntax.
The `<script>` element is a notable exception;
it is forbidden, eliminating the risk of script injection attacks.
In practice, `<script>` is ignored and a warning appears in the browser console.
See the [Security](guide/security) page for details.
-->
Angular 템플릿에는 HTML을 사용하며, 거의 모든 HTML 문법은 템플릿 문법에서도 유효합니다.
하지만 `<script>` 엘리먼트는 예외입니다. 이 엘리먼트는 스크립트 인젝션 공격에 노출될 수 있기 때문에 Angular 템플릿에 있더라도 처리되지 않으며, 브라우저 콘솔에 경고 메시지를 출력합니다.
더 자세한 내용은 [보안](guide/security) 문서를 확인하세요.

<!--
Some legal HTML doesn't make much sense in a template.
The `<html>`, `<body>`, and `<base>` elements have no useful role.
Pretty much everything else is fair game.
-->
Angular 템플릿에 유효하지 않은 HTML 엘리먼트가 몇가지 더 있습니다.
`<html>` 이나 `<body>`, `<base>` 엘리먼트는 Angular 템플릿에 사용해도 에러나 경고가 표시되지 않지만, 별다른 역할을 하지는 않습니다.
언급하지 않은 엘리먼트는 사용해도 됩니다.

<!--
You can extend the HTML vocabulary of your templates with components and directives that appear as new elements and attributes.
In the following sections, you'll learn how to get and set DOM (Document Object Model) values dynamically through data binding.
-->
컴포넌트나 디렉티브를 정의하면 템플릿에 사용할 수 있는 HTML 엘리먼트를 새롭게 정의하거나 표준 HTML 엘리먼트에는 없던 속성을 추가할 수 있습니다.
이 문서에서는 템플릿 문법을 하나씩 살펴보면서 DOM(Document Object Model) 값을 어떻게 참조하고 어떻게 원하는 값을 지정하는지 알아볼 것입니다.

<!--
Begin with the first form of data binding&mdash;interpolation&mdash;to see how much richer template HTML can be.
-->
가장 간단한 데이터 바인딩인 문자열 바인딩(interpolation)부터 살펴보면서 템플릿 HTML이 어떻게 확장되는지 알아봅시다.

<hr/>

{@a interpolation}
{@a 문자열-바인딩}


<!--
## Interpolation and Template Expressions
-->
## 문자열 바인딩과 템플릿 표현식

<!--
Interpolation allows you to incorporate calculated strings into the text
between HTML element tags and within attribute assignments. Template
expressions are what you use to calculate those strings.

The interpolation <live-example></live-example> demonstrates all of
the syntax and code snippets described in this section.
-->
문자열 바인딩(Interpolation)을 사용하면 HTML 엘리먼트 태그나 어트리뷰트에 지정하는 문자열을 조합할 수 있습니다.
그리고 이 문자열은 템플릿 표현식으로도 조합할 수 있습니다.

이 섹션에서 다루는 예제는 <live-example></live-example>에서 직접 확인하거나 다운받아 확인할 수 있습니다.

<!--
### Interpolation `{{...}}`
-->
### 문자열 바인딩 `{{...}}`

<!--
Interpolation refers to embedding expressions into marked up text.
By default, interpolation uses as its delimiter the double curly braces, `{{` and `}}`.

In the following snippet, `{{ currentCustomer }}` is an example of interpolation.
-->
문자열 바인딩은 문자열 안에 포함된 표현식을 의미합니다.
기본적으로 문자열 바인딩 문법은 이중 중괄호 `{{`와 `}}`를 사용합니다.

그래서 아래 코드에서 `{{ currentCustomer }}` 부분이 문자열 바인딩이 사용된 코드입니다.

<code-example path="interpolation/src/app/app.component.html" region="interpolation-example1" header="src/app/app.component.html"></code-example>

<!--
The text between the braces is often the name of a component
property. Angular replaces that name with the
string value of the corresponding component property.
-->
이중 중괄호 안에는 보통 컴포넌트 프로퍼티 이름을 사용합니다.
그러면 Angular가 템플릿을 파싱하면서 이 프로퍼티 이름을 해당 프로퍼티에 할당된 문자열 값으로 치환합니다.

<code-example path="interpolation/src/app/app.component.html" region="component-property" header="src/app/app.component.html"></code-example>

<!--
In the example above, Angular evaluates the `title` and `itemImageUrl` properties
and fills in the blanks, first displaying some title text and then an image.

More generally, the text between the braces is a **template expression**
that Angular first **evaluates** and then **converts to a string**.
The following interpolation illustrates the point by adding two numbers:
-->
위 예제에서 Angular는 `title`과 `itemImageUrl` 프로퍼티의 값으로 템플릿의 내용을 치환하기 때문에 화면에는 애플리케이션의 이름과 이미지가 표시됩니다.

좀 더 일반적으로 이야기하면, 이중 중괄호 안에 있는 텍스트는 **템플릿 표현식(template expression)**인데, 이 표현식은 Angular가 가장 먼저 **평가(evaluate)**해서 **문자열로 변환합니다**.
그래서 다음과 같이 숫자 2개를 더하는 연산도 처리할 수 있습니다:

<code-example path="interpolation/src/app/app.component.html" region="convert-string" header="src/app/app.component.html"></code-example>

<!--
The expression can invoke methods of the host component such as `getVal()` in
the following example:
-->
템플릿 표현식에서는 메소드를 실행할 수도 있습니다. 아래 예제에 사용된 `getVal()`은 호스트 컴포넌트에 선언된 메소드입니다:

<code-example path="interpolation/src/app/app.component.html" region="invoke-method" header="src/app/app.component.html"></code-example>

<!--
Angular evaluates all expressions in double curly braces,
converts the expression results to strings, and links them with neighboring literal strings. Finally,
it assigns this composite interpolated result to an **element or directive property**.

You appear to be inserting the result between element tags and assigning it to attributes.
However, interpolation is a special syntax that Angular converts into a *property binding*.
-->
이중 중괄호 안에 있는 템플릿 표현식은 Angular 프레임워크가 평가하고 문자열로 변환해서 같은 엘리먼트에 있는 문자열과 연결합니다. 이렇게 템플릿에 삽입된 문자열은 **엘리먼트나 디렉티브의 프로퍼티**로 사용됩니다.
사실 문자열 바인딩은 프로퍼티 바인딩을 사용하는 문법 중 하나입니다.

<div class="alert is-helpful">

<!--
If you'd like to use something other than `{{` and `}}`, you can
configure the interpolation delimiter via the
[interpolation](api/core/Component#interpolation)
option in the `Component` metadata.
-->

`Component` 메타데이터에 [interpolation](api/core/Component#interpolation) 옵션을 지정하면 `{{`와 `}}` 대신 다른 표기법을 사용할 수 있습니다.

</div>

{@a template-expressions}

<!--
### Template expressions
-->
### 템플릿 표현식

<!--
A template **expression** produces a value and appears within the double
curly braces, `{{ }}`.
Angular executes the expression and assigns it to a property of a binding target;
the target could be an HTML element, a component, or a directive.

The interpolation braces in `{{1 + 1}}` surround the template expression `1 + 1`.
In the property binding,
a template expression appears in quotes to the right of the&nbsp;`=` symbol as in `[property]="expression"`.
-->
템플릿 **표현식**은 이중 중괄호를 사용해서 `{{ }}`와 같이 사용하며, 표현식이 실행된 결과를 반환합니다.
Angular는 이 표현식을 실행하고 HTML 엘리먼트나 컴포넌트, 디렉티브 등 바인딩 대상이 되는 프로퍼티에 연결합니다.

그리고 문자열 바인딩은 템플릿 표현식을 감싼 형태입니다. 그래서 `1 + 1` 이라는 템플릿 표현식을 문자열 바인딩하면 `{{1 + 1}}`과 같은 형태가 됩니다.
프로퍼티 바인딩과 함께 사용한다면 큰따옴표(`"`)와 등호(`=`)를 사용해서 `[프로퍼티]="표현식"`과 같이 사용합니다.

<!--
In terms of syntax, template expressions are similar to JavaScript.
Many JavaScript expressions are legal template expressions, with a few exceptions.

You can't use JavaScript expressions that have or promote side effects,
including:

* Assignments (`=`, `+=`, `-=`, `...`)
* Operators such as `new`, `typeof`, `instanceof`, etc.
* Chaining expressions with <code>;</code> or <code>,</code>
* The increment and decrement operators `++` and `--`
* Some of the ES2015+ operators
-->
문법으로만 보면 템플릿 표현식은 JavaScript 문법과 비슷합니다.
그래서 JavaScript 문법 대부분은 템플릿 표현식에도 사용할 수 있지만 예외가 몇가지 있습니다.

다음 JavaScript 표현식은 템플릿 표현식에 사용할 수 없습니다:

* 값을 할당하는 표현 (`=`, `+=`, `-=`, `...`)
* `new`, `typeof`, `instanceof` 연산자
* <code>;</code>나 <code>,</code>로 체이닝하는 표현식
* 증감연산자 `++`, `--`
* ES2015 이후에 도입된 연산자 중 일부

<!--
Other notable differences from JavaScript syntax include:

* No support for the bitwise operators such as `|` and `&`
* New [template expression operators](guide/template-syntax#expression-operators), such as `|`, `?.` and `!`
-->
그리고 이런 점도 JavaScript 문법과 다릅니다:

* 비트 연산자 `|`와 `&`는 사용할 수 없습니다.
* [템플릿 표현식](guide/template-syntax#expression-operators)에서만 사용하는 연산자도 존재합니다: `|`, `?.`, `!`

<!--
### Expression context
-->
### 표현식의 컨텍스트

<!--
The *expression context* is typically the _component_ instance.
In the following snippets, the `recommended` within double curly braces and the
`itemImageUrl2` in quotes refer to properties of the `AppComponent`.
-->
*템플릿 표현식의 컨텍스트*는 일반적으로 _컴포넌트_ 인스턴스의 범위와 같습니다.
그래서 아래 예제에서 이중 중괄호 안에 사용된 `recommended`와 `itemImageUrl2`는 모두 `AppComponent`에 선언된 프로퍼티를 가리킵니다.

<code-example path="interpolation/src/app/app.component.html" region="component-context" header="src/app/app.component.html"></code-example>

<!--
An expression may also refer to properties of the _template's_ context
such as a template input variable,
&lt;!-- link to built-in-directives#template-input-variables --&gt;
`let customer`, or a template reference variable, `#customerInput`.
&lt;!-- link to guide/template-ref-variables --&gt;
-->
템플릿 표현식에서는 _템플릿 안에_ 선언된 템플릿 입력 변수도 참조할 수 있습니다.
그래서 아래 코드에 선언된 `let customer`나 `#customerInput`도 템플릿 표현식에 사용할 수 있습니다.

<!--
<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (template input variable)"></code-example>

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (template reference variable)"></code-example>
-->
<code-example path="interpolation/src/app/app.component.html" region="template-input-variable" header="src/app/app.component.html (템플릿 입력 변수)"></code-example>

<code-example path="interpolation/src/app/app.component.html" region="template-reference-variable" header="src/app/app.component.html (템플릿 참조 변수)"></code-example>

<!--
The context for terms in an expression is a blend of the _template variables_,
the directive's _context_ object (if it has one), and the component's _members_.
If you reference a name that belongs to more than one of these namespaces,
the template variable name takes precedence, followed by a name in the directive's _context_,
and, lastly, the component's member names.
-->
Angular 템플릿의 컨텍스트는 _템플릿 변수_와 디렉티브의 _context_ 객체, 컴포넌트의 _멤버_ 가 조합된 범위입니다.
이 중 참조하는 항목의 이름이 동시에 두 군데 존재하면 템플릿 변수의 우선순위가 가장 높습니다.
그 다음 우선순위는 디렉티브의 _context_ 객체이며, 컴포넌트 멤버의 우선순위가 가장 낮습니다.

<!--
The previous example presents such a name collision. The component has a `customer`
property and the `*ngFor` defines a `customer` template variable.
-->
위에서 살펴본 예제에도 이름이 겹치는 상황이 있습니다.
템플릿에 사용된 변수 `customer`는 컴포넌트 프로퍼티로도 존재하고 `*ngFor` 안에도 존재합니다.

<div class="alert is-helpful">

<!--
The `customer` in `{{customer.name}}`
refers to the template input variable, not the component's property.

Template expressions cannot refer to anything in
the global namespace, except `undefined`. They can't refer to
`window` or `document`. Additionally, they
can't call `console.log()` or `Math.max()` and they are restricted to referencing
members of the expression context.
-->
`{{customer.name}}`에 사용된 `customer`는 컴포넌트 프로퍼티가 아니라 템플릿 입력 변수를 가리킵니다.

그리고 템플릿 표현식은 전역 범위에 있는 객체는 사용할 수 없으며 `undefined`만 허용됩니다.
그래서 `window`나 `document`도 참조할 수 없습니다.
마찬가지로, `console.log()`나 `Math.max()`와 같은 템플릿 표현식도 사용할 수 없습니다.

</div>

<!--
### Expression guidelines
-->
### 템플릿 표현식 가이드라인

<!--
When using template expressions follow these guidelines:

* [Simplicity](guide/template-syntax#simplicity)
* [Quick execution](guide/template-syntax#quick-execution)
* [No visible side effects](guide/template-syntax#no-visible-side-effects)
-->
템플릿 표현식은 다음 가이드라인을 준수하며 사용하는 것을 권장합니다:

* [간단하게](guide/template-syntax#simplicity)
* [빠르게 실행되도록](guide/template-syntax#quick-execution)
* [외부 영향 최소화](guide/template-syntax#no-visible-side-effects)


{@a simplicity}
<!--
#### Simplicity
-->
#### 간단하게

<!--
Although it's possible to write complex template expressions, it's a better
practice to avoid them.

A property name or method call should be the norm, but an occasional Boolean negation, `!`, is OK.
Otherwise, confine application and business logic to the component,
where it is easier to develop and test.
-->
템플릿 표현식을 복잡하게 작성해도 동작은 하지만 이런 로직은 피하는 것이 좋습니다.

프로퍼티 이름이나 메소드 실행을 간단하게 작성하는 것이 일반적이고 필요하면 `!`와 같은 불리언 값을 바꾸는 것도 좋습니다.
하지만 애플리케이션이나 컴포넌트 로직의 일부를 템플릿 표현식에 작성하면 개발하기도 어렵고 테스트하기도 어렵습니다.


{@a quick-execution}
<!--
#### Quick execution
-->
#### 빠르게 실행되도록

<!--
Angular executes template expressions after every change detection cycle.
Change detection cycles are triggered by many asynchronous activities such as
promise resolutions, HTTP results, timer events, key presses and mouse moves.

Expressions should finish quickly or the user experience may drag, especially on slower devices.
Consider caching values when their computation is expensive.
-->
Angular는 변화감지 싸이클마다 템플릿 표현식을 실행합니다.
그리고 변화감지 싸이클은 프로미스가 완료되거나 HTTP 응답이 왔을때, 타이머 이벤트나 키 이벤트, 마우스 이벤트가 있을 때도 실행됩니다.

마우스 드래그를 활용하거나 디바이스의 사양이 낮을수록 템플릿 표현식은 빠르게 실행되어야 합니다.
연산이 많이 필요하다면 캐싱을 활용하는 방법도 고려해 보세요.


{@a no-visible-side-effects}
<!--
#### No visible side effects
-->
#### 외부 영향 최소화


<!--
A template expression should not change any application state other than the value of the
target property.
-->
템플릿 표현식은 대상 프로퍼티의 값만 변경하는 방식으로 작성하는 것이 좋습니다.
여러 프로퍼티나 애플리케이션의 상태를 변경하는 로직은 작성하지 않는 것을 권장합니다.

<!--
This rule is essential to Angular's "unidirectional data flow" policy.
You should never worry that reading a component value might change some other displayed value.
The view should be stable throughout a single rendering pass.
-->
이 규칙은 Angular가 제안하는 "단방향 데이터 흐름"의 관점에서도 아주 중요합니다.
다른 프로퍼티의 영향을 최소화하면 컴포넌트 프로퍼티를 참조하는 과정에 다른 프로퍼티의 영향을 걱정할 필요가 없으며, 뷰는 렌더링 단계에서 한 번만 갱신됩니다.

<!--
An [idempotent](https://en.wikipedia.org/wiki/Idempotence) expression is ideal because
it is free of side effects and improves Angular's change detection performance.
In Angular terms, an idempotent expression always returns
*exactly the same thing* until one of its dependent values changes.
-->
그래서 템플릿 표현식은 사이드 이펙트를 방지하고 Angular의 변화 감지 성능을 최대화하기 위해 [멱등적 (idempotent)](https://en.wikipedia.org/wiki/Idempotence)인 표현식으로 작성하는 것이 이상적입니다.

Angular에서 이야기하는 멱등적인 표현식이란, 어떤 값을 기준으로 표현식을 실행했을 때 *항상 같은 값을* 반환하는 표현식을 의미합니다.

<!--
Dependent values should not change during a single turn of the event loop.
If an idempotent expression returns a string or a number, it returns the same string or number when called twice in a row. If the expression returns an object, including an `array`, it returns the same object *reference* when called twice in a row.
-->
그리고 템플릿 표현식에 사용된 값은 이벤트 루프가 한 번 실행되는 동안 여러변 변경되면 안됩니다.
템플릿 표현식을 멱등적으로 작성해서 어떤 문자열이나 숫자를 반환한다면, 이 템플릿 표현식은 여러번 실행되더라도 항상 같은 값을 반환해야 합니다.
그리고 템플릿 표현식이 객체나 배열을 반환한다면, 이 템플릿 표현식은 여러번 실행되더라도 항상 같은 객체를 참조해야 합니다.

<div class="alert is-helpful">

<!--
There is one exception to this behavior that applies to `*ngFor`. `*ngFor` has `trackBy` functionality that can deal with referential inequality of objects when iterating over them. See [*ngFor with `trackBy`](guide/template-syntax#ngfor-with-trackby) for details.
-->`*ngFor`의 동작을 제어할 때는 이 규칙을 예외로 처리할 수 있습니다.
`*ngFor`를 사용하면서 `trackBy` 기능을 사용하면 이전과 다른 객체를 참조하더라도 같은 객체를 참조하는 것으로 간주할 수 있습니다.

더 자세한 내용을 확인하려면 이 문서의 [`trackBy`와 함께 사용하기](guide/template-syntax#trackBy) 섹션을 참고하세요.

</div>

<!-- end of Interpolation doc -->

<hr/>

<!--
{@a template-statements}
-->

{@a 템플릿-실행문}

<!--
## Template statements
-->
## 템플릿 실행문 (Template statements)

<!--
A template **statement** responds to an **event** raised by a binding target
such as an element, component, or directive.
You'll see template statements in the [event binding](guide/template-syntax#event-binding) section,
appearing in quotes to the right of the `=`&nbsp;symbol as in `(event)="statement"`.
-->
템플릿 **실행문**은 엘리먼트나 컴포넌트, 디렉티브에서 발생하는 **이벤트**에 반응합니다.
템플릿 실행문은 이 문서의 [이벤트 바인딩](guide/template-syntax#이벤트-바인딩) 섹션에서도 확인할 수 있으며,
`=` 기호를 사용해서 `(이벤트)="실행문"`과 같이 작성합니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

<!--
A template statement *has a side effect*.
That's the whole point of an event.
It's how you update application state from user action.
-->
템플릿 실행문은 *변화를 발생*시키며, 이벤트의 목적도 이것을 위한 것입니다.
템플릿 실행문은 사용자의 행동에 따라 애플리케이션을 동작시키기 위해 사용합니다.

<!--
Responding to events is the other side of Angular's "unidirectional data flow".
You're free to change anything, anywhere, during this turn of the event loop.
-->
이벤트에 반응하는 것은 Angular가 제안하는 "단방향 데이터 흐름"의 또다른 한 방향입니다.
이 방향은 컴포넌트 프로퍼티가 뷰로 반영되는 것의 반대 방향이며, 이벤트 루프에서는 어떠한 객체의 어떠한 값도 자유롭게 변경할 수 있습니다.

<!--
Like template expressions, template *statements* use a language that looks like JavaScript.
The template statement parser differs from the template expression parser and
specifically supports both basic assignment (`=`) and chaining expressions
(with <code>;</code> or <code>,</code>).
-->
템플릿 표현식과 비슷하게 템플릿 *실행문*도 JavaScript와 비슷한 문법을 사용합니다.
하지만 템플릿 실행문을 파싱하는 파서는 템플릿 표현식을 파싱하는 파서와 다르며, 템플릿 표현식에서는 사용할 수 없는 문법도 몇 가지는 사용할 수 있습니다.
템플릿 실행문에서는 값을 할당하는 표현이나(`=`) 여러 줄에 걸친 표현(<code>;</code>, <code>,</code>)도 사용할 수 있습니다.

<!--
However, certain JavaScript syntax is not allowed:
-->
하지만 다음과 같은 JavaScript 문법은 사용할 수 없습니다.

<!--
* <code>new</code>
* increment and decrement operators, `++` and `--`
* operator assignment, such as `+=` and `-=`
* the bitwise operators `|` and `&`
* the [template expression operators](guide/template-syntax#expression-operators)
-->
* <code>new</code> 키워드
* `+=`나 `-=`와 같은 연산 할당자
* `|`나 `&`와 같은 비트 연산자
* [템플릿 표현식 전용 연산자](guide/template-syntax#템플릿-표현식-전용-연산자)

<!--
### Statement context
-->
### 템플릿 실행문의 컨텍스트

<!--
As with expressions, statements can refer only to what's in the statement context
such as an event handling method of the component instance.
-->
템플릿 표현식과 비슷하게 템플릿 실행문도 컨텍스트가 제한되어 있으며, 컴포넌트 인스턴스에 있는 이벤트 핸들링 메소드를 주로 사용합니다.

<!--
The *statement context* is typically the component instance.
The *deleteHero* in `(click)="deleteHero()"` is a method of the data-bound component.
-->
*템플릿 실행문의 컨텍스트*는 컴포넌트 인스턴스의 범위와 같습니다.
예를 들어 아래 코드에서 `(click)="deleteHero()"`에 사용된 `deleteHero`는 컴포넌트에서 데이터를 처리하는 메소드입니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-component-statement" header="src/app/app.component.html"></code-example>

<!--
The statement context may also refer to properties of the template's own context.
In the following examples, the template `$event` object,
a [template input variable](guide/template-syntax#template-input-variable) (`let hero`),
and a [template reference variable](guide/template-syntax#ref-vars) (`#heroForm`)
are passed to an event handling method of the component.
-->
템플릿 실행문의 컨텍스트에서는 템플릿 컨텍스트 안에 있는 프로퍼티에 접근할 수도 있습니다.
아래 예제에서 `$event` 객체는 템플릿 변수이며, `let hero`는 [템플릿 입력 변수](guide/template-syntax#템플릿-입력-변수)이고,
`#heroForm`은 [템플릿 참조 변수](guide/template-syntax#템플릿-참조-변수)입니다.
각각의 변수는 컴포넌트의 이벤트 핸들링 메소드로 전달됩니다.

<code-example path="template-syntax/src/app/app.component.html" region="context-var-statement" header="src/app/app.component.html"></code-example>

<!--
Template context names take precedence over component context names.
In `deleteHero(hero)` above, the `hero` is the template input variable,
not the component's `hero` property.
-->
템플릿 컨텍스트의 항목 이름과 컴포넌트의 프로퍼티 이름이 중복되면 템플릿 컨텍스트의 우선순위가 높습니다.
위 코드를 예로 들면, `deleteHero(hero)`에 사용된 `hero`는 템플릿 입력 변수이며, 컴포넌트에 있는 `hero` 프로퍼티는 템플릿 변수에 의해 가려졌습니다.

<!--
### Statement guidelines
-->
### 템플릿 실행문 가이드라인

<!--
Template statements cannot refer to anything in the global namespace. They
can't refer to `window` or `document`.
They can't call `console.log` or `Math.max`.
-->
템플릿 실행문에서는 템플릿 표현식과 마찬가지로 전역 공간에 접근할 수 없습니다.
또, `window`나 `document`에도 접근할 수 없고, `console.log`나 `Math.max`와 같은 함수도 실행할 수 없습니다.

<!--
As with expressions, avoid writing complex template statements.
A method call or simple property assignment should be the norm.
-->
템플릿 표현식과 마찬가지로 템플릿 실행문에도 복잡한 로직을 작성하지 않는 것이 좋습니다.
간단하게 프로퍼티를 참조하거나 함수를 실행하는 것이 가장 좋은 방법입니다.

<hr/>

<!--
{@a binding-syntax}
-->

{@a 바인딩-문법}

<!--
## Binding syntax: an overview
-->
## 바인딩 문법 : 개요

<!--
Data-binding is a mechanism for coordinating what users see, specifically
with application data values.
While you could push values to and pull values from HTML,
the application is easier to write, read, and maintain if you turn these tasks over to a binding framework.
You simply declare bindings between binding sources, target HTML elements, and let the framework do the rest.

For a demonstration of the syntax and code snippets in this section, see the <live-example name="binding-syntax">binding syntax example</live-example>.

Angular provides many kinds of data-binding. Binding types can be grouped into three categories distinguished by the direction of data flow:

* From the _source-to-view_
* From _view-to-source_
* Two-way sequence: _view-to-source-to-view_
-->
사용자가 보는 화면과 애플리케이션 데이터의 값은 데이터 바인딩을 통해 자동으로 동기화됩니다.
데이터 바인딩을 지원하는 프레임워크에서는 HTML에 값을 반영하거나 HTML에서 값을 가져오는 과정이 훨씬 간단하기 때문에,
애플리케이션 로직을 쉽고 빠르면서 간결하게 작성할 수 있습니다.
바인딩할 객체와 HTML을 단순하게 연결하기만 하면 그 이후는 프레임워크가 알아서 필요한 작업을 수행합니다.

이 섹션에서 다루는 문법이 실행되는 것을 직접 확인하려면 <live-example name="binding-syntax">바인딩 문법 예제</live-example>를 참소하세요.

Angular는 데이터 바인딩을 여러가지 방식으로 제공합니다.
이 문서에서는 Angular가 제공하는 데이터 바인딩을 기본부터 차근차근 알아봅시다.

* 소스에서 화면으로
* 화면에서 소스로
* 양방향으로: 화면에서 소스로, 소스에서 화면으로

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="30%">
  </col>
  <col width="50%">
  </col>
  <col width="20%">
  </col>
  <tr>
    <th>
      <!--
      Type
      -->
      종류
    </th>
    <th>
      <!--
      Syntax
      -->
      문법
    </th>
    <th>
      Category
    </th>

  </tr>
  <tr>
     <td>
      <!--
      Interpolation<br>
      Property<br>
      Attribute<br>
      Class<br>
      Style
      -->
      문자열(Interpolation)<br>
      프로퍼티(property)<br>
      어트리뷰트(attribute)<br>
      클래스(class)<br>
      스타일(style)
    </td>
    <td>

      <!--
      <code-example>
        {{expression}}
        [target]="expression"
        bind-target="expression"
      </code-example>
      -->
      <code-example>
        {{표현식}}
        [대상]="표현식"
        bind-대상="표현식"
      </code-example>

    </td>

    <td>
      <!--
      One-way<br>from data source<br>to view target
      -->
      원천 소스에서<br>화면으로<br>단방향
    </td>
    <tr>
      <td>
        <!--
        Event
        -->
        이벤트
      </td>
      <td>
        <!--
        <code-example>
          (target)="statement"
          on-target="statement"
        </code-example>
      -->
        <code-example>
          (대상)="실행문"
          on-대상="실행문"
        </code-example>
      </td>

      <td>
        <!--
        One-way<br>from view target<br>to data source
        -->
        대상에서<br>데이터 소스로<br>단방향
      </td>
    </tr>
    <tr>
      <td>
        <!--
        Two-way
        -->
        양방향
      </td>
      <td>
        <!--
        <code-example>
          [(target)]="expression"
          bindon-target="expression"
        </code-example>
        -->
        <code-example>
          [(대상)]="표현식"
          bindon-대상="표현식"
        </code-example>
      </td>
      <td>
        <!--
        Two-way
        -->
        양방향
      </td>
    </tr>
  </tr>
</table>

<!--
Binding types other than interpolation have a **target name** to the left of the equal sign, either surrounded by punctuation, `[]` or `()`,
or preceded by a prefix: `bind-`, `on-`, `bindon-`.

The *target* of a binding is the property or event inside the binding punctuation: `[]`, `()` or `[()]`.

Every public member of a **source** directive is automatically available for binding.
You don't have to do anything special to access a directive member in a template expression or statement.
-->
문자열 바인딩을 제외하면 모든 바인딩 방식에는 등호 왼쪽에 **바인딩할 대상의 이름**이 있고, `[]`나 `()`로 둘러싸여 있거나 `bind-`, `on-`, `bindon-` 접두사가 붙습니다.

바인딩 *대상*은 `[]`나 `()`, `[()]` 안에 들어가는 프로퍼티나 이벤트입니다.

디렉티브의 멤버 중 `public`으로 지정된 멤버는 모두 바인딩할 수 있습니다.
디렉티브의 템플릿 표현식이나 실행문에 사용하기 위해 특별히 뭔가 더 할 것은 없습니다.

<!--
### Data-binding and HTML
-->
### 데이터 바인딩과 HTML

<!--
In the normal course of HTML development, you create a visual structure with HTML elements, and
you modify those elements by setting element attributes with string constants.
-->
일반적으로 HTML 문서를 작성할 때는 화면에 표시하는 모양에 맞게 HTML 엘리먼트 구조를 잡고 각 엘리먼트의 어트리뷰트를 문자열로 직접 지정했습니다.

```html
<div class="special">Plain old HTML</div>
<img src="images/item.png">
<button disabled>Save</button>
```

<!--
With data-binding, you can control things like the state of a button:
-->
데이터 바인딩을 활용하면 다음과 같이 버튼의 상태를 제어할 수 있습니다:

<code-example path="binding-syntax/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

<!--
Notice that the binding is to the `disabled` property of the button's DOM element,
**not** the attribute. This applies to data-binding in general. Data-binding works with *properties* of DOM elements, components, and directives, not HTML *attributes*.
-->
위 예제 코드에서 버튼의 DOM 엘리먼트에 바인딩된 `disabled`는 프로퍼티이며 어트리뷰트가 **아닙니다.**
데이터 바인딩은 이런 방식이 일반적입니다.
데이터 바인딩은 DOM 엘리먼트나 컴포넌트, 이렉티브의 *프로퍼티*와 바인딩합니다. *어트리뷰트*가 아닙니다.

<!--
### HTML attribute vs. DOM property
-->
### HTML 어트리뷰트 vs. DOM 프로퍼티

<!--
The distinction between an HTML attribute and a DOM property is key to understanding
how Angular binding works. **Attributes are defined by HTML. Properties are accessed from DOM (Document Object Model) nodes.**

* A few HTML attributes have 1:1 mapping to properties; for example, `id`.

* Some HTML attributes don't have corresponding properties; for example, `aria-*`.

* Some DOM properties don't have corresponding attributes; for example, `textContent`.

It is important to remember that *HTML attribute* and the *DOM property* are different things, even when they have the same name.
In Angular, the only role of HTML attributes is to initialize element and directive state.

**Template binding works with *properties* and *events*, not *attributes*.**

When you write a data-binding, you're dealing exclusively with the *DOM properties* and *events* of the target object.
-->
Angular에서 바인딩이 어떻게 동작하는지 이해하려면, HTML 어트리뷰트와 DOM 프로퍼티를 확실하게 구분해야 합니다.
**어트리뷰트는 HTML에 지정합니다. 그리고 프로퍼티는 DOM(Document Object Model)에 지정합니다.**

* 일부 HTML 어트리뷰트는 프로퍼티와 1:1 매칭됩니다. `id`가 그렇습니다.

* 일부 HTML 어트리뷰트는 프로퍼티와 매칭되지 않는 어트리뷰트도 있습니다. `aria-*` 어트리뷰트가 그렇습니다.

* 일부 DOM 프로퍼티는 해당되는 어트리뷰트가 없는 경우도 있습니다. `textContent`가 그렇습니다.

이름이 같은 것도 있지만 *HTML 어트리뷰트*와 *DOM 프로퍼티*는 다르다는 것을 명심해야 합니다.
Angular에서 HTML 어트리뷰트는 엘리먼트나 디렉티브 상태를 초기화할 때만 사용합니다.

**템플릿에서 하는 바인딩도 *어트리뷰트*가 아니라 *프로퍼티*와 *이벤트*를 바인딩하는 것입니다.**

그래서 데이터 바인딩은 *DOM 프로퍼티*와 *이벤트*만 대상 객체와 바인딩하는 것을 의미합니다.

<div class="alert is-helpful">

<!--
This general rule can help you build a mental model of attributes and DOM properties:
**Attributes initialize DOM properties and then they are done.
Property values can change; attribute values can't.**

There is one exception to this rule.
Attributes can be changed by `setAttribute()`, which re-initializes corresponding DOM properties.
-->
어트리뷰트와 DOM 프로퍼티를 구별하려면 확실한 규칙을 세워놓는 것이 좋습니다:
**어트리뷰트는 DOM 프로퍼티를 초기화하고 나면 역할을 다한 것입니다.
프로퍼티는 변경될 수 있지만 어트리뷰트는 변경되지 않습니다.**

다만 한가지 예외는 있습니다.
`setAttribute()`를 사용하면 어트리뷰트가 변경되기 때문에 관련된 DOM 프로퍼티도 다시 초기화됩니다.

</div>

<!--
For more information, see the [MDN Interfaces documentation](https://developer.mozilla.org/en-US/docs/Web/API#Interfaces) which has API docs for all the standard DOM elements and their properties.
Comparing the [`<td>` attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td) attributes to the [`<td>` properties](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) provides a helpful example for differentiation.
In particular, you can navigate from the attributes page to the properties via "DOM interface" link, and navigate the inheritance hierarchy up to `HTMLTableCellElement`.
-->
더 자세한 내용을 알아보려면 [MDN 인터페이스 문서](https://developer.mozilla.org/en-US/docs/Web/API#Interfaces)에서 설명하는 표준 DOM 엘리먼트와 이 엘리먼트의 프로퍼티에 대한 설명을 보는 것도 좋습니다.
그리고 [`<td>` 어트리뷰트](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td)와 [`<td>` 프로퍼티](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement)가 어떻게 다른지 비교해 보는 것도 좋습니다.
이 문서에서는 "DOM 인터페이스" 링크를 통해 어트리뷰트와 프로퍼티를 비교해볼 수 있기 때문에 `HTMLTableCellElement`의 계층 구조에 대해서도 함께 보면 더 좋습니다.


<!--
#### Example 1: an `<input>`
-->
#### 예제 1: `<input>`

<!--
When the browser renders `<input type="text" value="Sarah">`, it creates a
corresponding DOM node with a `value` property initialized to "Sarah".
-->
브라우저가 `<input type="text" value="Sarah">` 엘리먼트를 렌더링하면 DOM 노드의 `value` 프로퍼티를 "Sarah"로 초기화합니다.

```html
<input type="text" value="Sarah">
```

<!--
When the user enters "Sally" into the `<input>`, the DOM element `value` *property* becomes "Sally".
However, if you look at the HTML attribute `value` using `input.getAttribute('value')`, you can see that the *attribute* remains unchanged&mdash;it returns "Sarah".

The HTML attribute `value` specifies the *initial* value; the DOM `value` property is the *current* value.

To see attributes versus DOM properties in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax.
-->
그리고 사용자가 `<input>` 엘리먼트에 "Sally"를 입력하면 DOM 엘리먼트의 `value` *프로퍼티*가 "Sally"로 변경됩니다.
하지만 `input.getAttribute('value')`를 실행해서 `value` HTML 어트리뷰트의 값을 확인해보면 이 *어트리뷰트* 값은 여전히 "Sarah"인 것을 확인할 수 있습니다.

`value` HTML 어트리뷰트는 *초기값*을 지정하는 용도로 사용되지만, `value` DOM 프로퍼티는 *현재값*을 저장하는 용도로 사용됩니다.

어트리뷰트와 DOM 프로퍼티의 관계를 동작하는 앱에서 확인해 보려면 <live-example name="binding-syntax"></live-example>를 참고하세요.

<!--
#### Example 2: a disabled button
-->
#### 예제 2: 버튼 비활성화

<!--
The `disabled` attribute is another example. A button's `disabled`
*property* is `false` by default so the button is enabled.

When you add the `disabled` *attribute*, its presence alone
initializes the button's `disabled` *property* to `true`
so the button is disabled.
-->
`disabled` 어트리뷰트는 조금 다릅니다.
버튼의 `disabled` *프로퍼티*의 기본값은 `false`이기 때문에 기본 상태에서 버튼은 활성화되어 있습니다.

그리고 `disabled` *어트리뷰트*를 추가하면 이 어트리뷰트는 버튼의 `disabled` *프로퍼티* 값을 `true`로 바꾸기 때문에 버튼도 비활성화 됩니다.

```html
<button disabled>Test Button</button>
```

<!--
Adding and removing the `disabled` *attribute* disables and enables the button.
However, the value of the *attribute* is irrelevant,
which is why you cannot enable a button by writing `<button disabled="false">Still Disabled</button>`.

To control the state of the button, set the `disabled` *property*,
-->
이때 `disabled` *어트리뷰트*가 존재하는지에 따라서 버튼이 활성화 되거나 비활성화 되며, *어트리뷰트* 값은 중요하지 않습니다.
`<button disabled="false">Still Disabled</button>`와 같이 작성해도 버튼은 비활성화됩니다.

버튼의 활성화 여부를 결정하는 것은 `disabled` *프로퍼티* 입니다.

<div class="alert is-helpful">

<!--
Though you could technically set the `[attr.disabled]` attribute binding, the values are different in that the property binding requires to a boolean value, while its corresponding attribute binding relies on whether the value is `null` or not. Consider the following:
-->
문법으로 보면 `[attr.disabled]` 처럼 어트리뷰트 바인딩을 사용할 수도 있지만 이 때 지정하는 값은 프로퍼티를 바인딩할 때 사용했던 불리언 값이 아니라 `null`이거나 `null`이 아닌 값만을 구별합니다.
다음 코드를 참고하세요:

```html
<input [disabled]="condition ? true : false">
<input [attr.disabled]="condition ? 'disabled' : null">
```

<!--
Generally, use property binding over attribute binding as it is more intuitive (being a boolean value), has a shorter syntax, and is more performant.
-->
일반적으로 프로퍼티 바인딩을 사용하면 어트리뷰트 바인딩을 사용할때보다 코드가 짧으며, 성능이 좋고 이 경우에는 불리언 값을 그대로 반영하기 때문에 좀 더 직관적입니다.

</div>


<!--
To see the `disabled` button example in a functioning app, see the <live-example name="binding-syntax"></live-example> especially for binding syntax. This example shows you how to toggle the disabled property from the component.
-->
`disabled` 버튼이 동작하는 것을 직접 확인해 보려면 <live-example name="binding-syntax"></live-example>에서 바인딩 문법 쪽을 보면 좋습니다.
이 예제는 컴포넌트의 프로퍼티에 따라 버튼의 비활성화를 토글하는 예제입니다.


<!--
## Binding types and targets
-->
## 타입에 따른 바인딩 대상

<!--
The **target of a data-binding** is something in the DOM.
Depending on the binding type, the target can be a property (element, component, or directive),
an event (element, component, or directive), or sometimes an attribute name.
The following table summarizes the targets for the different binding types.
-->
**데이터 바인딩 대상**은 DOM에 있는 무언가입니다.
이 때 바인딩 대상은 바인딩 종류에 따라 엘리먼트,컴포넌트, 디렉티브의 프로퍼티가 될수도 있고 이벤트가 될수도 있으며, 어트리뷰트 이름이 될수도 있습니다.
바인딩 종류에 따라 어떤 것이 바인딩 대상이 되는지 아래 표로 확인해 보세요.

<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <!--
  <col width="10%">
  </col>
  <col width="15%">
  </col>
  <col width="75%">
  </col>
  -->
  <col width="15%">
  </col>
  <col width="21%">
  </col>
  <col width="64%">
  </col>
  <tr>
    <th>
      <!--
      Type
  	  -->
  	  종류
    </th>
    <th>
      <!--
      Target
      -->
      대상
    </th>
    <th>
      <!--
      Examples
      -->
      예제
    </th>
  </tr>
  <tr>
    <td>
      <!--
      Property
      -->
      프로퍼티
    </td>
    <td>
      <!--
      Element&nbsp;property<br>
      Component&nbsp;property<br>
      Directive&nbsp;property
      -->
      엘리먼트 프로퍼티<br>
      컴포넌트 프로퍼티<br>
      디렉티브 프로퍼티
    </td>
    <td>
      <!--
      <code>src</code>, <code>hero</code>, and <code>ngClass</code> in the following:
      -->
      <code>src</code>, <code>hero</code>, <code>ngClass</code> 프로퍼티:
      <code-example path="template-syntax/src/app/app.component.html" region="property-binding-syntax-1"></code-example>
      <!-- For more information, see [Property Binding](guide/property-binding). -->
    </td>
  </tr>
  <tr>
    <td>
      <!--
      Event
      -->
      이벤트
    </td>
    <td>
      <!--
      Element&nbsp;event<br>
      Component&nbsp;event<br>
      Directive&nbsp;event
      -->
      엘리먼트 이벤트<br>
      컴포넌트 이벤트<br>
      디렉티브 이벤트
    </td>
    <td>
      <!--
      <code>click</code>, <code>deleteRequest</code>, and <code>myClick</code> in the following:
      -->
      <code>click</code>, <code>deleteRequest</code>, <code>myClick</code> 이벤트:
      <code-example path="template-syntax/src/app/app.component.html" region="event-binding-syntax-1"></code-example>
      <!-- KW--Why don't these links work in the table? -->
      <!-- <div>For more information, see [Event Binding](guide/event-binding).</div> -->
    </td>
  </tr>
  <tr>
    <td>
      <!--
      Two-way
      -->
      양방향
    </td>
    <td>
      <!--
      Event and property
      -->
      이벤트, 프로퍼티
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="2-way-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      <!--
      Attribute
      -->
      어트리뷰트
    </td>
    <td>
      <!--
      Attribute
      (the&nbsp;exception)
      -->
      어트리뷰트(일부)
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="attribute-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      <!--
      Class
      -->
      클래스
    </td>
    <td>
      <!--
      <code>class</code> property
      -->
      <code>class</code> 프로퍼티
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="class-binding-syntax-1"></code-example>
    </td>
  </tr>
  <tr>
    <td>
      <!--
      Style
      -->
      스타일
    </td>
    <td>
      <!--
      <code>style</code> property
      -->
      <code>style</code> 프로퍼티
    </td>
    <td>
      <code-example path="template-syntax/src/app/app.component.html" region="style-binding-syntax-1"></code-example>
    </td>
  </tr>
</table>

<!-- end of binding syntax -->

<hr/>

{@a property-binding}

{@a 프로퍼티-바인딩}
<!--
## Property binding `[property]`
-->
## 프로퍼티 바인딩 `[property]`

<!--
Use property binding to _set_ properties of target elements or
directive `@Input()` decorators. For an example
demonstrating all of the points in this section, see the
<live-example name="property-binding">property binding example</live-example>.
-->
프로퍼티 바인딩은 대상 엘리먼트나 디렉티브에 있는 프로퍼티 중 `@Input()` 데코레이터를 사용한 프로퍼티의 값을 _설정하기 위해_ 사용합니다.
이 문서에서 다루는 내용을 확인하려면 <live-example name="property-binding">프로퍼티 바인딩 예제</live-example>를 참고하세요.

<!--
### One-way in
-->
### 단방향 전달

<!--
Property binding flows a value in one direction,
from a component's property into a target element property.

You can't use property
binding to read or pull values out of target elements. Similarly, you cannot use
property binding to call a method on the target element.
If the element raises events, you can listen to them with an [event binding](guide/template-syntax#event-binding).

If you must read a target element property or call one of its methods,
see the API reference for [ViewChild](api/core/ViewChild) and
[ContentChild](api/core/ContentChild).
-->
프로퍼티 바인딩은 컴포넌트의 프로퍼티값 하나를 대상 엘리먼트 프로퍼티로 한 번 전달합니다.

그래서 프로퍼티 바인딩은 대상 엘리먼트의 값을 읽는 용도로 사용할 수는 없습니다.
이와 비슷하게, 대상 엘리먼트에 있는 메소드를 실행하는 용도로도 사용할 수 없습니다.
엘리먼트에서 발생하는 이벤트에 반응하려면 [이벤트 바인딩](guide/template-syntax#event-binding)을 사용해야 합니다.

대상 엘리먼트의 프로퍼티를 읽거나 메소드를 실행해야 한다면 [ViewChild](api/core/ViewChild)나 [ContentChild](api/core/ContentChild)를 활용하는 것이 좋습니다.


<!--
### Examples
-->
### 예제

<!--
The most common property binding sets an element property to a component
property value. An example is
binding the `src` property of an image element to a component's `itemImageUrl` property:

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

Here's an example of binding to the `colSpan` property. Notice that it's not `colspan`,
which is the attribute, spelled with a lowercase `s`.

<code-example path="property-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

For more details, see the [MDN HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) documentation.
-->
프로퍼티 바인딩은 보통 컴포넌트의 프로퍼티 값을 지정하기 위해 사용합니다.
컴포넌트의 `itemImageUrl` 프로퍼티 값을 `<img>` 엘리먼트의 `src` 프로퍼티에 지정하려면 다음과 같이 구현합니다:

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

`colSpan` 프로퍼티도 바인딩할 수 있습니다.
소문자 `s`가 사용된 어트리뷰트 `colspan`이 아니라 `colSpan` 프로퍼티라는 것에 주의하세요.

<code-example path="property-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

테이블 셀에 사용할 수 있는 프로퍼티 목록은 [MDN HTMLTableCellElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement) 문서를 참고하세요.

<!-- Add link when Attribute Binding updates are merged:
For more about `colSpan` and `colspan`, see (Attribute Binding)[guide/template-syntax]. -->

<!--
Another example is disabling a button when the component says that it `isUnchanged`:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

Another is setting a property of a directive:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

Yet another is setting the model property of a custom component&mdash;a great way
for parent and child components to communicate:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>
-->
컴포넌트의 `isUnchanged` 프로퍼티를 사용했던 것처럼 버튼을 비활성화하는 용도로도 사용할 수 있습니다:

<code-example path="property-binding/src/app/app.component.html" region="disabled-button" header="src/app/app.component.html"></code-example>

디렉티브에서는 이렇게 사용합니다:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

그리고 아직 다루지는 않았지만, 부모 컴포넌트의 객체를 자식 컴포넌트로 전달할 때는 이렇게 사용할 수 있습니다:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

<!--
### Binding targets
-->
### 바인딩 대상

<!--
An element property between enclosing square brackets identifies the target property.
The target property in the following code is the image element's `src` property.
-->
엘리먼트의 프로퍼티를 대괄호(`[`, `]`)로 감싸면 프로퍼티 바인딩 대상으로 지정할 수 있습니다.
그래서 다음 코드에서는 이미지 엘리먼트의 `src` 프로퍼티가 프로퍼티 바인딩의 대상 프로퍼티입니다.

<code-example path="property-binding/src/app/app.component.html" region="property-binding" header="src/app/app.component.html"></code-example>

<!--
There's also the `bind-` prefix alternative:
-->
이 방식이 익숙하지 않다면 다음과 같이 `bind-` 접두사를 사용할 수도 있습니다.

<code-example path="property-binding/src/app/app.component.html" region="bind-prefix" header="src/app/app.component.html"></code-example>

<!--
In most cases, the target name is the name of a property, even
when it appears to be the name of an attribute.
So in this case, `src` is the name of the `<img>` element property.

Element properties may be the more common targets,
but Angular looks first to see if the name is a property of a known directive,
as it is in the following example:
-->
대부분의 경우에 바인딩 대상으로 지정한 이름은 프로퍼티 이름입니다. 어트리뷰트같이 보여도 프로퍼티인 경우가 더 많습니다.
위 예제도 `src`는 `<img>` 엘리먼트의 프로퍼티입니다.

바인딩되는 프로퍼티는 대상 엘리먼트의 프로퍼티인 것이 일반적이지만, 다음과 같이 Angular가 제공하는 기본 디렉티브의 프로퍼티일 수도 있습니다.
이 때는 엘리먼트 프로퍼티보다 디렉티브 프로퍼티의 우선순위가 높습니다:

<code-example path="property-binding/src/app/app.component.html" region="class-binding" header="src/app/app.component.html"></code-example>

<!--
Technically, Angular is matching the name to a directive `@Input()`,
one of the property names listed in the directive's `inputs` array
or a property decorated with `@Input()`.
Such inputs map to the directive's own properties.

If the name fails to match a property of a known directive or element, Angular reports an “unknown directive” error.
-->
Angular는 바인딩 대상을 찾을 때 `@Input()`이 지정된 프로퍼티나 디렉티브의 `inputs` 배열을 찾습니다.

그리고 매칭되는 이름을 찾지 못하면 "unknown directive" 에러가 발생합니다.

<div class="alert is-helpful">

<!--
Though the target name is usually the name of a property,
there is an automatic attribute-to-property mapping in Angular for
several common attributes. These include `class`/`className`, `innerHtml`/`innerHTML`, and
`tabindex`/`tabIndex`.
-->
일반적으로 바인딩 대상은 프로퍼티의 이름과 매칭되지만 어트리뷰트 값이 프로퍼티 값과 자동으로 연결된 경우도 있습니다.
`class`/`className`, `innerHtml`/`innerHTML`, `tabindex`/`tabIndex`가 그렇습니다.

</div>


{@a avoid-side-effects}

<!--
### Avoid side effects
-->
### 외부 영향 최소화

<!--
Evaluation of a template expression should have no visible side effects.
The expression language itself, or the way you write template expressions,
helps to a certain extent;
you can't assign a value to anything in a property binding expression
nor use the increment and decrement operators.

For example, you could have an expression that invoked a property or method that had
side effects. The expression could call something like `getFoo()` where only you
know what `getFoo()` does. If `getFoo()` changes something
and you happen to be binding to that something,
Angular may or may not display the changed value. Angular may detect the
change and throw a warning error.
As a best practice, stick to properties and to methods that return
values and avoid side effects.
-->
템플릿 표현식을 평가하는 것은 다른 곳에 영향을 주지 않는 것이 좋습니다.
표현식은 그 자체로 실행되고 끝나야지 이 표현식의 결과가 다른 컨텍스트에 영향을 주면 디버깅하기 어렵습니다.
템플릿 표현식의 결과값으로 바인딩된 프로퍼티 값을 지정하는 것은 좋지만 템플릿 표현식에서 증감연산자를 사용하는 것도 좋지 않습니다.

템플릿 표현식 밖으로 영향을 미치는 표현식에 대해 생각해 봅시다.
`getFoo()`라는 함수가 어떤 동작을 하는지 제대로 이해하고 있다면 템플릿 표현식에서 이 함수를 사용하는 것이 문제되지 않습니다.
그런데 `getFoo()` 함수는 한 템플릿 표현식 외에도 다른 곳에 사용되어 바인딩된 값을 바꿀 수 있습니다.
Angular가 이런 문제를 발견한다면 경고 메시지를 표시하겠지만 모든 경우를 감지할 수는 없기 때문에 좋지 않습니다.
가장 좋은 방법은 프로퍼티를 그대로 전달하거나 메소드가 실행한 값을 그대로 반환하는 것입니다.


<!--
### Return the proper type
-->
### 맞는 타입으로 반환하세요.

<!--
The template expression should evaluate to the type of value
that the target property expects.
Return a string if the target property expects a string, a number if it
expects a number, an object if it expects an object, and so on.

In the following example, the `childItem` property of the `ItemDetailComponent` expects a string, which is exactly what you're sending in the property binding:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

You can confirm this by looking in the `ItemDetailComponent` where the `@Input` type is set to a string:
<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (setting the @Input() type)"></code-example>

As you can see here, the `parentItem` in `AppComponent` is a string, which the `ItemDetailComponent` expects:
<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>
-->
템플릿 표현식을 작성할 때는 이 표현식이 반환하는 값의 타입을 적절하게 지정해야 합니다.
대상 프로퍼티가 문자열이라면 문자열을 반환해야 하고, 대상 프로퍼티가 숫자라면 숫자를, 대상 프로퍼티가 객체라면 객체를 반환해야 합니다.

아래 예제에서 `ItemDetailComponent`의 `childItem` 프로퍼티는 `string` 타입으로 선언되어 있으며 프로퍼티 바인딩은 다음과 같이 사용되었습니다:

<code-example path="property-binding/src/app/app.component.html" region="model-property-binding" header="src/app/app.component.html"></code-example>

아래 `ItemDetailComponent` 코드에서도 알 수 있듯이 `@Input()`으로 지정된 프로퍼티는 `string` 타입입니다:

<code-example path="property-binding/src/app/item-detail/item-detail.component.ts" region="input-type" header="src/app/item-detail/item-detail.component.ts (@Input() 데코레이터가 지정된 프로퍼티)"></code-example>

그렇다면 `AppComponent`가 전달하는 `parentItem` 프로퍼티도 문자열이어야 이 코드가 모두 제대로 동작할 것입니다:

<code-example path="property-binding/src/app/app.component.ts" region="parent-data-type" header="src/app/app.component.ts"></code-example>


<!--
#### Passing in an object
-->
#### 객체 전달하기

<!--
The previous simple example showed passing in a string. To pass in an object,
the syntax and thinking are the same.

In this scenario, `ListItemComponent` is nested within `AppComponent` and the `items` property expects an array of objects.

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

The `items` property is declared in the `ListItemComponent` with a type of `Item` and decorated with `@Input()`:

<code-example path="property-binding/src/app/list-item/list-item.component.ts" region="item-input" header="src/app/list-item.component.ts"></code-example>

In this sample app, an `Item` is an object that has two properties; an `id` and a `name`.

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

While a list of items exists in another file, `mock-items.ts`, you can
specify a different item in `app.component.ts` so that the new item will render:

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

You just have to make sure, in this case, that you're supplying an array of objects because that's the type of `items` and is what the nested component, `ListItemComponent`, expects.

In this example, `AppComponent` specifies a different `item` object
(`currentItem`) and passes it to the nested `ListItemComponent`. `ListItemComponent` was able to use `currentItem` because it matches what an `Item` object is according to `item.ts`. The `item.ts` file is where
`ListItemComponent` gets its definition of an `item`.
-->
위 예제는 문자열을 전달하기 때문에 아주 간단합니다.
그리고 객체의 경우도 마찬가지입니다.

`AppComponent`의 `items` 프로퍼티는 객체의 배열이고 이 프로퍼티가 `ListItemComponent`로 바인딩되는 경우를 봅시다.

<code-example path="property-binding/src/app/app.component.html" region="pass-object" header="src/app/app.component.html"></code-example>

`ListItemComponent`의 `items` 프로퍼티는 `@Input()` 데코레이터로 지정되었으며 이 배열은 `Item` 타입의 배열입니다.

<code-example path="property-binding/src/app/list-item/list-item.component.ts" region="item-input" header="src/app/list-item.component.ts"></code-example>

이 예제 앱에서 `Item` 객체에는 `id` 프로퍼티와 `name` 프로퍼티가 존재합니다.

<code-example path="property-binding/src/app/item.ts" region="item-class" header="src/app/item.ts"></code-example>

원래 이 데이터는 외부 파일 `mock-items.ts`에 있지만, `AppComponent`에 다음과 같이 작성해도 앱은 동작합니다:

<code-example path="property-binding/src/app/app.component.ts" region="pass-object" header="src/app.component.ts"></code-example>

여기에서 확인해야 할 것은, `ListItemComponent`의 `items` 프로퍼티는 객체의 배열을 할당받는 것으로 정의했기 때문에 이 타입에 맞는 값을 바인딩해야 한다는 것입니다.

위 코드처럼 `AppComponent`의 `currentItem` 프로퍼티 값을 `Item` 배열 형식으로 할당하면 자식 컴포넌트 `ListItemComponent`도 제대로 동작합니다.
`AppComponent`에서는 `Item` 타입이라는 것을 명시하지 않았지만 이 객체가 `ListItemComponent`에서 원하는 형식과 같기 때문입니다.


<!--
### Remember the brackets
-->
### 괄호를 깜빡하면 안됩니다.

<!--
The brackets, `[]`, tell Angular to evaluate the template expression.
If you omit the brackets, Angular treats the string as a constant
and *initializes the target property* with that string:
-->
템플릿 표현식은 프로퍼티를 대괄호로 감싸야 Angular가 템플릿 표현식이라고 인식하고 실행할 수 있습니다.
그래서 대괄호가 없으면 Angular는 이 문장을 단순하게 문자열로 판단하고 *대상 프로퍼티를 그 문자열로 초기화*할 것입니다.

<code-example path="property-binding/src/app/app.component.html" region="no-evaluation" header="src/app.component.html"></code-example>

<!--
Omitting the brackets will render the string
`parentItem`, not the value of `parentItem`.
-->
괄호를 깜빡하면 `parentItem`의 값 대신 `parentItem`이라는 문자열을 표시합니다.


<!--
### One-time string initialization
-->
### 문자열을 그대로 사용하는 경우

<!--
You *should* omit the brackets when all of the following are true:
-->
다음과 같은 경우라면 프로퍼티 바인딩에 사용하는 대괄호를 빼는 것이 좋습니다.

<!--
* The target property accepts a string value.
* The string is a fixed value that you can put directly into the template.
* This initial value never changes.
-->
* 바인딩 대상 프로퍼티에 문자열 값을 할당하는 경우
* 템플릿에서 고정된 문자열 값을 전달하는 경우
* 변경되지 않는 문자열

<!--
You routinely initialize attributes this way in standard HTML, and it works
just as well for directive and component property initialization.
The following example initializes the `prefix` property of the `StringInitComponent` to a fixed string,
not a template expression. Angular sets it and forgets about it.
-->
HTML에서 어트리뷰트를 초기화하는 방식은 Angular에서도 유효하며, 디렉티브나 컴포넌트 프로퍼티를 초기화할 때도 같은 방식을 사용합니다.
다음 예제를 보면 `HeroDetailComponent` 에 사용할 `prefix` 프로퍼티를 초기화하는데, 이 때 템플릿 표현식을 사용하지 않고 고정된 문자열을 사용했습니다.
그러면 Angular는 대상 프로퍼티의 초기값을 설정할 때만 이 문자열을 사용하고, 이후에는 신경쓰지 않습니다.

<code-example path="property-binding/src/app/app.component.html" region="string-init" header="src/app/app.component.html"></code-example>

<!--
The `[item]` binding, on the other hand, remains a live binding to the component's `currentItem` property.
-->
하지만 `[item]` 바인딩에서는 컴포넌트의 `currentItem` 프로퍼티 값에 따라 전달되는 값이 달라지기 때문에 대문자를 사용하는 것이 좋습니다.


<!--
### Property binding vs. interpolation
-->
### 프로퍼티 바인딩 vs. 문자열 바인딩

<!--
You often have a choice between interpolation and property binding.
The following binding pairs do the same thing:
-->
코드를 작성하다보면 프로퍼티 바인딩을 해야할 지 문자열 바인딩(Interpolation)을 해야할 지 고민될 때가 있습니다.
코드를 보면서 생각해봅시다:

<code-example path="property-binding/src/app/app.component.html" region="property-binding-interpolation" header="src/app/app.component.html"></code-example>

<!--
Interpolation is a convenient alternative to property binding in
many cases. When rendering data values as strings, there is no
technical reason to prefer one form to the other, though readability
tends to favor interpolation. However, *when setting an element
property to a non-string data value, you must use property binding*.
-->
일반적으로 문자열 바인딩은 프로퍼티 바인딩을 간단하게 사용하는 방법으로 볼 수 있습니다.
그리고 문자열을 화면에 렌더링하는 경우라면 꼭 필요한 경우가 아닌 이상 문자열 바인딩을 사용한 코드가 가독성이 좋습니다.
*하지만 문자열이 아닌 값으로 엘리먼트 프로퍼티 값을 지정하는 경우라면 반드시 프로퍼티 바인딩을 사용해야 합니다.*

<!--
### Content security
-->
### 컨텐츠 보안

<!--
Imagine the following malicious content.

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

In the component template, the content might be used with interpolation:

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

Fortunately, Angular data binding is on alert for dangerous HTML. In the above case,
the HTML displays as is, and the Javascript does not execute. Angular **does not**
allow HTML with script tags to leak into the browser, neither with interpolation
nor property binding.

In the following example, however, Angular [sanitizes](guide/security#sanitization-and-security-contexts)
the values before displaying them.

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

Interpolation handles the `<script>` tags differently than
property binding but both approaches render the
content harmlessly. The following is the browser output
of the `evilTitle` examples.

<code-example language="bash">
"Template <script>alert("evil never sleeps")</script> Syntax" is the interpolated evil title.
"Template alert("evil never sleeps")Syntax" is the property bound evil title.
</code-example>
-->
다음과 같은 악성 코드가 있다고 합시다.

<code-example path="property-binding/src/app/app.component.ts" region="malicious-content" header="src/app/app.component.ts"></code-example>

이 프로퍼티는 템플릿에서 다음과 같이 문자열 바인딩되어 사용됩니다:

<code-example path="property-binding/src/app/app.component.html" region="malicious-interpolated" header="src/app/app.component.html"></code-example>

다행히 Angular는 데이터 바인딩을 처리하면서 위험한 HTML을 발견하면 경고를 표시합니다.
그리고 위와 같은 코드가 있더라도 이 코드의 JavaScript 부분을 실행하지 않고 HTML 문자열로 그냥 표시합니다.
프로퍼티 바인딩의 경우도 마찬가지입니다.

아래 예제 코드처럼 작성해도 Angular는 화면에 프로퍼티값을 표시하기 전에 [코드의 안전성을 검사](guide/security#sanitization-and-security-contexts)합니다.

<code-example path="property-binding/src/app/app.component.html" region="malicious-content" header="src/app/app.component.html"></code-example>

문자열 바인딩을 사용한 경우와 프로퍼티 바인딩을 사용한 경우에 `<script>` 태그를 처리하는 방식이 조금 다르지만, 두 경우 모두 코드의 안전성을 검사한 이후에 화면에 렌더링한다는 점은 같습니다.
위 코드처럼 작성하면 브라우저 콘솔에 다음과 같은 경고 문구가 출력됩니다.

<code-example language="bash">
"Template <script>alert("evil never sleeps")</script> Syntax" is the interpolated evil title.
"Template alert("evil never sleeps")Syntax" is the property bound evil title.
</code-example>


<hr/>
{@a other-bindings}
{@a 기타-바인딩}

<!--
## Attribute, class, and style bindings
-->
## 어트리뷰트, 클래스, 스타일 바인딩

<!--
The template syntax provides specialized one-way bindings for scenarios less well-suited to property binding.

To see attribute, class, and style bindings in a functioning app, see the <live-example name="attribute-binding"></live-example> especially for this section.
-->
Angular 템플릿에서는 프로퍼티 바인딩 외에도 다음과 같은 특수한 바인딩을 사용할 수 있습니다.

이 문서에서 설명하는 내용을 앱에서 직접 확인하려면 <live-example name="attribute-binding"></live-example>를 참고하세요.


{@a attribute-binding}
<!--
### Attribute binding
-->
### 어트리뷰트 바인딩

<!--
Set the value of an attribute directly with an **attribute binding**. This is the only exception to the rule that a binding sets a target property and the only binding that creates and sets an attribute.

Usually, setting an element property with a [property binding](guide/template-syntax#property-binding)
is preferable to setting the attribute with a string. However, sometimes
there is no element property to bind, so attribute binding is the solution.

Consider the [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) and
[SVG](https://developer.mozilla.org/en-US/docs/Web/SVG). They are purely attributes, don't correspond to element properties, and don't set element properties. In these cases, there are no property targets to bind to.

Attribute binding syntax resembles property binding, but
instead of an element property between brackets, start with the prefix `attr`,
followed by a dot (`.`), and the name of the attribute.
You then set the attribute value, using an expression that resolves to a string,
or remove the attribute when the expression resolves to `null`.

One of the primary use cases for attribute binding
is to set ARIA attributes, as in this example:
-->
**어트리뷰트 바인딩**은 어트리뷰트 값을 직접 설정할 때 사용합니다.
이 방식은 프로퍼티를 바인딩하는 것과 조금 다릅니다.

일반적으로 엘리먼트 프로퍼티값을 지정하려면 문자열로 어트리뷰트를 바인딩하는 것보다 [프로퍼티 바인딩](guide/template-syntax#property-binding)을 사용하는 것이 더 좋습니다.
하지만 원하는 프로퍼티가 없어서 어트리뷰트 바인딩을 사용해야만 하는 경우가 있습니다.

[ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)나 [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG)의 경우를 생각해 봅시다.
이 객체들은 어트리뷰트로만 구성되기 때문에 엘리먼트 프로퍼티가 존재하지 않아서 엘리먼트의 프로퍼티를 지정할 수 없습니다.
프로퍼티 바인딩의 대상이 되는 것이 존재하지 않는 상황입니다.

어트리뷰트 바인딩 문법은 프로퍼티 바인딩 문법과 비슷하지만 대괄호 안에 엘리먼트 프로퍼티를 지정하는 대신 `attr`이라는 접미사와 `.` 문자를 붙인다는 점이 다릅니다.
그리고 어트리뷰트에 할당되는 값이 문자열인 경우에는 이 어트리뷰트 바인딩이 유효하지만, `null` 값이 할당되는 경우에는 어트리뷰트 자체가 존재하지 않습니다.

그래서 ARIA 어트리뷰트는 다음과 같은 방식으로 지정합니다:

<code-example path="attribute-binding/src/app/app.component.html" region="attrib-binding-aria" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">


<!--
#### `colspan` and `colSpan`
-->
#### `colspan`과 `colSpan`

<!--
Notice the difference between the `colspan` attribute and the `colSpan` property.

If you wrote something like this:
-->
`colspan` 어트리뷰트와 `colSpan` 프로퍼티의 차이점에 대해 알아봅시다.

다음과 같은 코드를 작성했다고 합시다:

<code-example language="html">
  &lt;tr&gt;&lt;td colspan="{{1 + 1}}"&gt;Three-Four&lt;/td&gt;&lt;/tr&gt;
</code-example>

<!--
You'd get this error:
-->
그러면 에러가 발생합니다:

<code-example language="bash">
  Template parse errors:
  Can't bind to 'colspan' since it isn't a known native property
</code-example>

<!--
As the message says, the `<td>` element does not have a `colspan` property. This is true
because `colspan` is an attribute&mdash;`colSpan`, with a capital `S`, is the
corresponding property. Interpolation and property binding can set only *properties*, not attributes.

Instead, you'd use property binding and write it like this:
-->
이 메시지는 `<td>` 엘리먼트에 `colspan` 프로퍼티가 없다는 의미입니다.
왜냐하면 소문자 `s`가 들어간 `colspan`은 어트리뷰트이고 대문자 `S`가 들어간 `colSpan`은 프로퍼티이기 때문입니다.
문자열 바인딩이나 프로퍼티 바인딩은 *프로퍼티에만* 동작합니다.
어트리뷰트는 이렇게 바인딩할 수 없습니다.

이 코드는 프로퍼티 바인딩 규칙에 맞게 다음과 같이 작성되어야 합니다:

<code-example path="attribute-binding/src/app/app.component.html" region="colSpan" header="src/app/app.component.html"></code-example>

</div>


<hr/>

{@a class-binding}
<!--
### Class binding
-->
### 클래스 바인딩

<!--
Here's how to set the `class` attribute without a binding in plain HTML:

```html
<!- standard class attribute setting ->
<div class="foo bar">Some text</div>
```

You can also add and remove CSS class names from an element's `class` attribute with a **class binding**.

To create a single class binding, start with the prefix `class` followed by a dot (`.`) and the name of the CSS class (for example, `[class.foo]="hasFoo"`). 
Angular adds the class when the bound expression is truthy, and it removes the class when the expression is falsy (with the exception of `undefined`, see [styling delegation](#styling-delegation)).

To create a binding to multiple classes, use a generic `[class]` binding without the dot (for example, `[class]="classExpr"`).
The expression can be a space-delimited string of class names, or you can format it as an object with class names as the keys and truthy/falsy expressions as the values. 
With object format, Angular will add a class only if its associated value is truthy. 

It's important to note that with any object-like expression (`object`, `Array`, `Map`, `Set`, etc), the identity of the object must change for the class list to be updated.
Updating the property without changing object identity will have no effect.

If there are multiple bindings to the same class name, conflicts are resolved using [styling precedence](#styling-precedence).
-->
바인딩을 사용하지 않고 문자열로 `class` 어트리뷰트를 지정하려면 다음과 같이 작성하면 됩니다:

```html
<!-- 일반적인 클래스 어트리뷰트 설정 방법 -->
<div class="foo bar">Some text</div>
```

여기에 **클래스 바인딩** 을 사용하면 엘리먼트의 `class` 어트리뷰트를 원하는 대로 추가하거나 제거할 수 있습니다.

CSS 클래스 하나를 바인딩하려면 `class`라는 접미사 뒤에 `.` 문자를 붙여서 `[class.foo]="hasFoo"`와 같이 작성하면 됩니다.
그러면 `hasFoo`라는 표현식이 참으로 평가될 때 `foo` 클래스가 추가되며, 표현식이 거짓으로 평가되면 `foo` 클래스가 제거됩니다.
(이 때 `undefined`는 예외입니다. [스타일 위임](#styling-delegation) 섹션을 참고하세요.)

CSS 클래스 여러 개를 한번에 바인딩하려면 `.` 방식을 사용하지 않고 `[class]`에 표현식을 할당하는 방식을 사용합니다.
이 방식은 `[class]="classExpr"`와 같이 작성하는데, 표현식 부분에 공백으로 구분되는 문자열을 지정하거나, 클래스 이름이 키(key)이고 지정 여부가 값(value)인 형태의 객체를 지정합니다.
객체를 지정하는 방식을 사용하면 엘리먼트에 원하는 CSS 클래스만 지정하기 편합니다.

이 때 객체는 `object`나 `Array`, `Map`, `Set` 등의 형식을 사용할 수 있는데, CSS 클래스가 제대로 지정되려면 이 객체 자체가 변경되어야 합니다.
객체는 그대로이고 프로퍼티 값만 변경되는 경우는 제대로 동작하지 않을 수 있습니다.

같은 클래스 이름이 동시에 사용되어 충돌하는 경우라면 [스타일 적용 우선순위](#styling-precedence) 섹션을 참고하세요.


<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <th>
      <!--
      Binding Type
      -->
      바인딩 타입
    </th>
    <th>
      <!--
      Syntax
      -->
      문법
    </th>
    <th>
      <!--
      Input Type
      -->
      입력값 타입
    </th>
    <th>
      <!--
      Example Input Values
      -->
      사용할 수 있는 값
    </th>
  </tr>
  <tr>
    <!--
    <td>Single class binding</td>
    -->
    <td>단일 클래스 바인딩</td>
    <td><code>[class.foo]="hasFoo"</code></td>
    <td><code>boolean | undefined | null</code></td>
    <td><code>true</code>, <code>false</code></td>
  </tr>
  <tr>
    <!--
    <td rowspan=3>Multi-class binding</td>
    -->
    <td rowspan=3>여러 클래스 바인딩</td>
    <td rowspan=3><code>[class]="classExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"my-class-1 my-class-2 my-class-3"</code></td>
  </tr>
  <tr>
    <td><code>{[key: string]: boolean | undefined | null}</code></td>
    <td><code>{foo: true, bar: false}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['foo', 'bar']</code></td>
  </tr>
</table>


<!--
The [NgClass](#ngclass) directive can be used as an alternative to direct `[class]` bindings. 
However, using the above class binding syntax without `NgClass` is preferred because due to improvements in class binding in Angular, `NgClass` no longer provides significant value, and might eventually be removed in the future.
-->
`[class]`를 직접 바인딩하는 방식 외에 [NgClass](#ngclass) 디렉티브를 사용하는 방식도 고려해 볼 만 합니다.
하지만 Angular 차원에서 클래스 바인딩 방식의 개선을 고려하고 있기 때문에 `[class]`를 직접 바인딩하는 방식도 나쁜 것은 아닙니다.
`NgClass` 디렉티브를 아예 없애는 것도 고려하고 있습니다.

<hr/>

{@a style-binding}
<!--
### Style binding
-->
### 스타일 바인딩

<!--
Here's how to set the `style` attribute without a binding in plain HTML:

```html
<!- standard style attribute setting ->
<div style="color: blue">Some text</div>
```

You can also set styles dynamically with a **style binding**.

To create a single style binding, start with the prefix `style` followed by a dot (`.`) and the name of the CSS style property (for example, `[style.width]="width"`). 
The property will be set to the value of the bound expression, which is normally a string.
Optionally, you can add a unit extension like `em` or `%`, which requires a number type.

<div class="alert is-helpful">

Note that a _style property_ name can be written in either
[dash-case](guide/glossary#dash-case), as shown above, or
[camelCase](guide/glossary#camelcase), such as `fontSize`.

</div>

If there are multiple styles you'd like to toggle, you can bind to the `[style]` property directly without the dot (for example, `[style]="styleExpr"`).
The expression attached to the `[style]` binding is most often a string list of styles like `"width: 100px; height: 100px;"`. 

You can also format the expression as an object with style names as the keys and style values as the values, like `{width: '100px', height: '100px'}`. 
It's important to note that with any object-like expression (`object`, `Array`, `Map`, `Set`, etc), the identity of the object must change for the class list to be updated.
Updating the property without changing object identity will have no effect.

If there are multiple bindings to the same style property, conflicts are resolved using [styling precedence rules](#styling-precedence).
-->
바인딩을 사용하지 않고 문자열로 `style` 어트리뷰트를 지정하려면 다음과 같이 작성하면 됩니다:

```html
<!-- 일반적인 스타일 어트리뷰트 설정 방법 -->
<div style="color: blue">Some text</div>
```

여기에 동적으로 스타일을 지정하려면 **스타일 바인딩**을 사용하면 됩니다.

스타일 하나를 바인딩하려면 `style`이라는 접미사 뒤에 `.` 문자를 붙이고 원하는 CSS 스타일 프로퍼티의 이름을 지정해서 `[style.width]="width"`와 같이 작성하면 됩니다.
그러면 바인딩 표현식의 결과값으로 프로퍼티 값이 지정되며, 이 값은 일반적으로 문자열입니다.
`em`이나 `%`와 같은 단위를 명시한다면 숫자 타입을 사용할 수도 있습니다.

<div class="alert is-helpful">

_스타일 프로퍼티_ 이름은 [대시 케이스(dash-case)](guide/glossary#dash-case)일 수도 있고 `fontSize`와 같이 [캐멀 케이스(camelCase)](guide/glossary#camelcase)일 수도 있습니다.

</div>

스타일 여러개를 동시에 바인딩하려면 접미사와 `.` 문자 없이 `[style]` 프로퍼티를 직접 바인딩하는 방식을 사용할 수 있습니다.
이 방식은 `[style]="styleExpr"`과 같이 작성하는데, 이때 스타일 표현식은 일반적으로 `"width: 100px; height: 100px;"`과 같은 형식의 문자열로 지정합니다.

문자열 방식 외에도 스타일 이름을 키(key)로 하고 원하는 값을 지정하는 객체형식(`{width: '100px', height: '100px'}`)도 사용할 수 있습니다.
이 때 객체는 `object`나 `Array`, `Map`, `Set` 등의 형식을 사용할 수 있는데, CSS 클래스가 제대로 지정되려면 이 객체 자체가 변경되어야 합니다.
객체는 그대로이고 프로퍼티 값만 변경되는 경우는 제대로 동작하지 않을 수 있습니다.

같은 스타일 프로퍼티가 동시에 사용되어 충돌하는 경우라면 [스타일 적용 우선순위](#styling-precedence) 섹션을 참고하세요.


<style>
  td, th {vertical-align: top}
</style>

<table width="100%">
  <col width="15%">
  </col>
  <col width="20%">
  </col>
  <col width="35%">
  </col>
  <col width="30%">
  </col>
  <tr>
    <th>
      <!--
      Binding Type
      -->
      바인딩 타입
    </th>
    <th>
      <!--
      Syntax
      -->
      문법
    </th>
    <th>
      <!--
      Input Type
      -->
      입력값 타입
    </th>
    <th>
      <!--
      Example Input Values
      -->
      사용할 수 있는 값
    </th>
  </tr>
  <tr>
    <!--
    <td>Single style binding</td>
    -->
    <td>단일 스타일 바인딩</td>
    <td><code>[style.width]="width"</code></td>
    <td><code>string | undefined | null</code></td>
    <td><code>"100px"</code></td>
  </tr>
  <tr>
  <tr>
  	<!--
    <td>Single style binding with units</td>
    -->
    <td>단위와 함께 사용하는 단일 스타일 바인딩</td>
    <td><code>[style.width.px]="width"</code></td>
    <td><code>number | undefined | null</code></td>
    <td><code>100</code></td>
  </tr>
    <tr>
    <!--
    <td rowspan=3>Multi-style binding</td>
    -->
    <td rowspan=3>여러 스탕리 바인딩</td>
    <td rowspan=3><code>[style]="styleExpr"</code></td>
    <td><code>string</code></td>
    <td><code>"width: 100px; height: 100px"</code></td>
  </tr>
  <tr>
    <td><code>{[key: string]: string | undefined | null}</code></td>
    <td><code>{width: '100px', height: '100px'}</code></td>
  </tr>
  <tr>
    <td><code>Array</code><<code>string</code>></td>
    <td><code>['width', '100px']</code></td>
  </tr>
</table>

<!--
The [NgStyle](#ngstyle) directive can be used as an alternative to direct `[style]` bindings. 
However, using the above style binding syntax without `NgStyle` is preferred because due to improvements in style binding in Angular, `NgStyle` no longer provides significant value, and might eventually be removed in the future.
-->
`[style]`을 직접 바인딩하는 방식 외에 [NgStyle](#ngstyle) 디렉티브를 사용하는 방식도 고려해 볼 만 합니다.
하지만 Angular 차원에서 스타일 바인딩 방식의 개선을 고려하고 있기 때문에 `[style]`를 직접 바인딩하는 방식도 나쁜 것은 아닙니다.
`NgStyle` 디렉티브를 아예 없애는 것도 고려하고 있습니다.

<hr/>

{@a styling-precedence}
<!--
### Styling Precedence
-->
### 스타일 적용 우선순위

<!--
A single HTML element can have its CSS class list and style values bound to a multiple sources (for example, host bindings from multiple directives).

When there are multiple bindings to the same class name or style property, Angular uses a set of precedence rules to resolve conflicts and determine which classes or styles are ultimately applied to the element.

<div class="alert is-helpful">
<h4>Styling precedence (highest to lowest)</h4>

1. Template bindings
    1. Property binding (for example, `<div [class.foo]="hasFoo">` or `<div [style.color]="color">`)
    1. Map binding (for example, `<div [class]="classExpr">` or `<div [style]="styleExpr">`)
    1. Static value (for example, `<div class="foo">` or `<div style="color: blue">`) 
1. Directive host bindings
    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)    
1. Component host bindings
    1. Property binding (for example, `host: {'[class.foo]': 'hasFoo'}` or `host: {'[style.color]': 'color'}`)
    1. Map binding (for example, `host: {'[class]': 'classExpr'}` or `host: {'[style]': 'styleExpr'}`)
    1. Static value (for example, `host: {'class': 'foo'}` or `host: {'style': 'color: blue'}`)    

</div>

The more specific a class or style binding is, the higher its precedence.

A binding to a specific class (for example, `[class.foo]`) will take precedence over a generic `[class]` binding, and a binding to a specific style (for example, `[style.bar]`) will take precedence over a generic `[style]` binding.

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

Specificity rules also apply when it comes to bindings that originate from different sources. 
It's possible for an element to have bindings in the template where it's declared, from host bindings on matched directives, and from host bindings on matched components.

Template bindings are the most specific because they apply to the element directly and exclusively, so they have the highest precedence.

Directive host bindings are considered less specific because directives can be used in multiple locations, so they have a lower precedence than template bindings.

Directives often augment component behavior, so host bindings from components have the lowest precedence. 

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

In addition, bindings take precedence over static attributes. 

In the following case, `class` and `[class]` have similar specificity, but the `[class]` binding will take precedence because it is dynamic.

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>
-->
HTML 엘리먼트는 CSS 클래스와 스타일 값을 여러개 가질 수 있습니다. 클래스나 스타일을 지정하는 디렉티브가 여러개 적용된 경우도 마찬가지입니다.

그런데 같은 클래스 이름이나 스타일 프로퍼티가 동시에 바인딩되면 충돌이 발생할 수 있는데 Angular는 이 충돌을 발생하기 위해 우선순위를 마련해두었습니다.

<div class="alert is-helpful">
<h4>스타일 적용 우선순위 (높은 것부터 낮은 순으로)</h4>

1. 템플릿 바인딩
    1. 프로퍼티 바인딩 (ex. `<div [class.foo]="hasFoo">`, `<div [style.color]="color">`)
    1. Map 바인딩 (ex. `<div [class]="classExpr">`, `<div [style]="styleExpr">`)
    1. 정적 바인딩 (ex. `<div class="foo">`, `<div style="color: blue">`) 
1. 디렉티브 호스트 바인딩
    1. 프로퍼티 바인딩 (ex. `host: {'[class.foo]': 'hasFoo'}`, `host: {'[style.color]': 'color'}`)
    1. Map 바인딩 (ex. `host: {'[class]': 'classExpr'}`, `host: {'[style]': 'styleExpr'}`)
    1. 정적 바인딩 (ex. `host: {'class': 'foo'}`, `host: {'style': 'color: blue'}`)    
1. 컴포넌트 호스트 바인딩
    1. 프로퍼티 바인딩 (ex. `host: {'[class.foo]': 'hasFoo'}`, `host: {'[style.color]': 'color'}`)
    1. Map 바인딩 (ex. `host: {'[class]': 'classExpr'}`, `host: {'[style]': 'styleExpr'}`)
    1. 정적 바인딩 (ex. `host: {'class': 'foo'}`, `host: {'style': 'color: blue'}`)    

</div>

더 구체적으로 지정하는 클래스와 스타일 바인딩의 우선순위가 더 높습니다.

그래서 `[class.foo]`처럼 바인딩하는 방식이 `[class]`를 바인딩하는 것보다 우선순위가 높고, `[style.bar]`처럼 바인딩하는 방식이 `[style]`을 바인딩하는 것보다 우선순위가 높습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="basic-specificity" header="src/app/app.component.html"></code-example>

이 규칙은 클래스나 스타일을 지정하는 소스가 다른 경우에도 마찬가지입니다.
그래서 템플릿에서 직접 지정한 것보다 디렉티브로 호스트 바인딩한 스타일이 적용될 수도 있습니다.

하지만 일반적으로는 템플릿에서 직접 바인딩할 때 가장 구체적인 규칙을 사용하기 때문에 대부분의 경우 템플릿 바인딩의 우선순위가 가장 높습니다.

그리고 디렉티브로 바인딩할 때는 이 디렉티브가 여러 곳에서 다른 방식으로 사용될 수 있기 때문에 템플릿 바인딩에 비하면 우선순위가 낮을 수 있습니다.

디렉티브는 컴포넌트의 동작을 확장하는 용도로 하는 것이 주목적이기 때문에 이 방식의 우선순위가 가장 낮습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="source-specificity" header="src/app/app.component.html"></code-example>

클래스나 스타일을 바인딩하면 정적 어트리뷰트로 지정한 것보다 우선순위가 높습니다.

아래 예제에서 `class`와 `[class]`를 사용한 것은 비슷해보이지만 `[class]`는 정적인 규칙이 적용된 이후에 동적으로 적용되기 때문에 우선순위가 더 높습니다.

<code-example path="attribute-binding/src/app/app.component.html" region="dynamic-priority" header="src/app/app.component.html"></code-example>

{@a styling-delegation}
<!--
### Delegating to styles with lower precedence
-->
### 낮은 우선순위로 위임될 때

<!--
It is possible for higher precedence styles to "delegate" to lower precedence styles using `undefined` values.
Whereas setting a style property to `null` ensures the style is removed, setting it to `undefined` will cause Angular to fall back to the next-highest precedence binding to that style.

For example, consider the following template: 

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

Imagine that the `dirWithHostBinding` directive and the `comp-with-host-binding` component both have a `[style.width]` host binding.
In that case, if `dirWithHostBinding` sets its binding to `undefined`, the `width` property will fall back to the value of the `comp-with-host-binding` host binding.
However, if `dirWithHostBinding` sets its binding to `null`, the `width` property will be removed entirely.
-->
클래스나 스타일 적용 우선순위가 높다고 해도 `undefined` 값이 바인딩 된 경우라면 낮은 우선순위가 적용될 수 있습니다.
스타일 프로퍼티를 `null`로 지정하면 해당 스타일이 확실하게 제거되며, `undefined`로 지정하면 다음 우선순위로 넘어갑니다.

예를 들어 다음과 같은 템플릿 코드가 있다고 합시다:

<code-example path="attribute-binding/src/app/app.component.html" region="style-delegation" header="src/app/app.component.html"></code-example>

`dirWithHostBinding` 디렉티브와 `comp-with-host-binding` 컴포넌트가 모두 `[style.width]`를 호스트 바인딩한다고 합시다.
그런데 `dirWithHostBinding`에서 `width` 프로퍼티에 `undefined` 값을 바인딩하면 `comp-with-host-binding`에 있는 스타일이 적용됩니다.
하지만 `dirWithHostBinding`에서 `width` 프로퍼티에 `null` 값을 바인딩하면 `width` 프로퍼티는 제거됩니다.


<!--
{@a event-binding}
-->
{@a 이벤트-바인딩}

{@a event-binding}
<!--
## Event binding `(event)`
-->
## 이벤트 바인딩 `(event)`

<!--
Event binding allows you to listen for certain events such as
keystrokes, mouse movements, clicks, and touches. For an example
demonstrating all of the points in this section, see the <live-example name="event-binding">event binding example</live-example>.

Angular event binding syntax consists of a **target event** name
within parentheses on the left of an equal sign, and a quoted
template statement on the right.
The following event binding listens for the button's click events, calling
the component's `onSave()` method whenever a click occurs:
-->
이벤트 바인딩 문법을 사용하면 키 입력이나 마우스의 움직임, 클릭이나 터치 이벤트를 감지할 수 있습니다.
이 섹션에서 설명하는 내용은 <live-example name="event-binding">이벤트 바인딩 예제</live-example> 에서 직접 확인할 수 있습니다.

이벤트 바인딩은 **대상 이벤트** 이름을 괄호(`(`, `)`)로 감싸고 템플릿 실행문을 등호로 연결해서 작성합니다.
예를 들어 버튼의 클릭 이벤트를 감지하고 있다가 사용자가 버튼을 클릭할 때 컴포넌트에 있는 `onSave()` 메소드를 실행하려면 다음과 같이 구현합니다.

<div class="lightbox">
  <img src='generated/images/guide/template-syntax/syntax-diagram.svg' alt="Syntax diagram">
</div>

<!--
### Target event
-->
### 대상 이벤트

<!--
As above, the target is the button's click event.
-->
위에서 언급한 것처럼, 대상 이벤트는 버튼 클릭 이벤트입니다.

<code-example path="event-binding/src/app/app.component.html" region="event-binding-1" header="src/app/app.component.html"></code-example>

<!--
Alternatively, use the `on-` prefix, known as the canonical form:
-->
이 방식이 익숙하지 않다면 다음과 같이 `on-` 접두사를 사용할 수도 있습니다.

<code-example path="event-binding/src/app/app.component.html" region="event-binding-2" header="src/app/app.component.html"></code-example>

<!--
Element events may be the more common targets, but Angular looks first to see if the name matches an event property
of a known directive, as it does in the following example:
-->
엘리먼트에서 발생하는 이벤트는 HTML 스펙에 정의된 이벤트인 경우가 대부분입니다. 하지만 커스텀 이벤트가 정의되어 있다면 그 이벤트도 같은 방식으로 사용할 수 있습니다. 커스텀 이벤트의 이름이 일반 이벤트 이름과 겹치면 커스텀 이벤트의 우선순위가 더 높습니다:

<code-example path="event-binding/src/app/app.component.html" region="custom-directive" header="src/app/app.component.html"></code-example>

<!--
If the name fails to match an element event or an output property of a known directive,
Angular reports an “unknown directive” error.
-->
그리고 엘리먼트 이벤트나 커스텀 디렉티브에서 해당되는 이벤트 이름을 찾지 못하면 “unknown directive” 에러가 발생합니다.

<!--
### *$event* and event handling statements
-->
### *$event* 객체와 이벤트 처리 실행문

<!--
In an event binding, Angular sets up an event handler for the target event.
-->
이벤트를 바인딩하면 Angular의 이벤트 처리 함수가 대상 이벤트와 연결됩니다.

<!--
When the event is raised, the handler executes the template statement.
The template statement typically involves a receiver, which performs an action
in response to the event, such as storing a value from the HTML control
into a model.
-->
그러면 이벤트가 발생했을 때 Angular 프레임워크의 이벤트 처리 함수가 템플릿 실행문을 실행하는데,
이 템플릿 실행문을 사용해서 원하는 동작을 실행할 수 있습니다.

<!--
The binding conveys information about the event. This information can include data values such as an event object, string, or number named `$event`.

The target event determines the shape of the `$event` object.
If the target event is a native DOM element event, then `$event` is a
[DOM event object](https://developer.mozilla.org/en-US/docs/Web/Events),
with properties such as `target` and `target.value`.
-->
이 때 템플릿 실행문에는 이벤트에 대한 정보와 이벤트가 발생한 HTML 컨트롤에 대한 정보가 `$event` 라는 객체에 담겨 전달됩니다.
그리고 이 정보는 `$event`라는 이름으로 뭉뚱그려지기는 했지만 객체가 될 수도 있고 문자열이나 숫자가 될 수도 있습니다.

`$event` 객체의 타입은 이벤트가 어떤것이냐에 따라 달라집니다.
대상 이벤트가 네이티브 DOM 엘리먼트의 이벤트라면 `$envet` 객체는 [DOM 이벤트 객체](https://developer.mozilla.org/en-US/docs/Web/Events)이며, 이 객체에서 `target` 프로퍼티나 `target.value` 값을 참조할 수 있습니다.

<!--
Consider this example:
-->
다음 예제를 봅시다:

<code-example path="event-binding/src/app/app.component.html" region="event-binding-3" header="src/app/app.component.html"></code-example>

<!--
This code sets the `<input>` `value` property by binding to the `name` property.
To listen for changes to the value, the code binds to the `input`
event of the `<input>` element.
When the user makes changes, the `input` event is raised, and the binding executes
the statement within a context that includes the DOM event object, `$event`.
-->
이 코드에서는 `currentHero.name` 프로퍼티를 `<input>` 엘리먼트의 `value` 프로퍼티로 바인딩하면서 초기값을 지정합니다.
그리고 값이 변경되는 것을 감지하기 위해 `<input>` 엘리먼트의 `input` 이벤트를 바인딩합니다.
사용자가 입력 필드의 값을 변경하면 `input` 이벤트가 발생하고 이 이벤트에 연결된 템플릿 실행문이 실행되는데, 이 때 DOM 이벤트 객체가 `$event` 객체로 템플릿 실행문에 전달됩니다.

<!--
To update the `name` property, the changed text is retrieved by following the path `$event.target.value`.
-->
그리고 이벤트 객체에서 값을 참조해서 `name` 프로퍼티 값을 다시 지정하기 위해 템플릿 실행문을 `$event.target.value` 와 같이 작성했습니다.

<!--
If the event belongs to a directive&mdash;recall that components
are directives&mdash;`$event` has whatever shape the directive produces.
-->
대상 이벤트가 DOM 엘리먼트의 이벤트가 아니고 커스텀 디렉티브(컴포넌트)에서 정의하는 이벤트라면, `$event` 객체는 해당 디렉티브에서 정의하는 대로 자유로운 형식이 될 수 있습니다.

<!--
### Custom events with `EventEmitter`
-->
{@a custom-events-with-eventemitter}
### `EventEmitter`로 커스텀 이벤트 보내기

<!--
Directives typically raise custom events with an Angular [EventEmitter](api/core/EventEmitter).
The directive creates an `EventEmitter` and exposes it as a property.
The directive calls `EventEmitter.emit(payload)` to fire an event, passing in a message payload, which can be anything.
Parent directives listen for the event by binding to this property and accessing the payload through the `$event` object.
-->
Angular에서 제공하는 [EventEmitter](api/core/EventEmitter)를 사용하면 커스텀 이벤트를 만들 수 있습니다.
우선, 디렉티브에 `EventEmitter` 타입의 프로퍼티를 선언하고 이 프로퍼티를 디렉티브 외부로 열어줍니다.
그런 뒤 `EventEmitter` 객체의 `emit(데이터)` 함수를 실행하면 데이터가 `$event` 객체에 담겨 디렉티브 외부로 전달됩니다.
부모 디렉티브에서는 자식 디렉티브의 이벤트 프로퍼티를 바인딩해서 이 커스텀 이벤트를 감지하고 있다가, 이벤트가 발생했을 때 `$event` 이벤트에 담긴 데이터를 받아서 처리하면 됩니다.

<!--
Consider an `ItemDetailComponent` that presents item information and responds to user actions.
Although the `ItemDetailComponent` has a delete button, it doesn't know how to delete the hero. It can only raise an event reporting the user's delete request.

Here are the pertinent excerpts from that `ItemDetailComponent`:
-->
`ItemDetailComponent` 는 아이템을 화면에 표시하면서 사용자의 동작에도 반응해야 한다고 합시다.
그런데 이 컴포넌트에 삭제 버튼이 있다고 해도 이 컴포넌트는 히어로를 어떻게 삭제하는지 알지 못합니다.
이 동작을 구현하려면 사용자가 삭제 요청을 했을 때 이벤트를 발생시키고, 부모 컴포넌트에서 이 이벤트를 받아 처리하는 방법이 가장 좋습니다.

`ItemDetailComponent` 코드에서 관련된 부분을 봅시다:

<code-example path="event-binding/src/app/item-detail/item-detail.component.html" header="src/app/item-detail/item-detail.component.html (template)" region="line-through"></code-example>

<code-example path="event-binding/src/app/item-detail/item-detail.component.ts" header="src/app/item-detail/item-detail.component.ts (deleteRequest)" region="deleteRequest"></code-example>

<!--
The component defines a `deleteRequest` property that returns an `EventEmitter`.
When the user clicks *delete*, the component invokes the `delete()` method,
telling the `EventEmitter` to emit an `Item` object.

Now imagine a hosting parent component that binds to the `deleteRequest` event
of the `ItemDetailComponent`.
-->
컴포넌트에는 `EventEmitter`를 반환하는 `deleteRequest` 프로퍼티가 존재합니다.
사용자가 *삭제* 버튼을 클릭하면 `delete()` 메소드를 실행하고,
이 함수에서는 컴포넌트에 `EventEmitter` 타입으로 선언한 `deleteRequest` 프로퍼티에 `Item` 객체를 담아 컴포넌트 외부로 보냅니다.

그러면 부모 컴포넌트에서 이 이벤트를 받기 위해 `deleteRequest` 프로퍼티를 바인딩하고 있어야 합니다.

<code-example path="event-binding/src/app/app.component.html" header="src/app/app.component.html (event-binding-to-component)" region="event-binding-to-component"></code-example>

<!--
When the `deleteRequest` event fires, Angular calls the parent component's
`deleteItem()` method, passing the *item-to-delete* (emitted by `ItemDetail`)
in the `$event` variable.
-->
최종적으로 `deleteRequest` 이벤트가 발생하면 Angular는 부모 컴포넌트의 `deleteItem()` 메소드를 실행하면서
(`ItemDetail`에서 보낸) *삭제해야 할 아이템*에 대한 정보를 `$event` 변수에 담아 전달합니다.

<!--
### Template statements have side effects
-->
### 템플릿 실행문의 영향

<!--
Though [template expressions](guide/template-syntax#template-expressions) shouldn't have [side effects](guide/template-syntax#avoid-side-effects), template
statements usually do. The `deleteItem()` method does have
a side effect: it deletes an item.

Deleting an item updates the model, and depending on your code, triggers
other changes including queries and saving to a remote server.
These changes propagate through the system and ultimately display in this and other views.
-->
[템플릿 표현식](guide/template-syntax#template-expressions)은 실행되더라도 [사이드 이펙트](guide/template-syntax#avoid-side-effects)가 없지만, 템플릿 실행문은 사이드 이펙트를 유발할 수 있습니다. 예를 들어 `deleteItem()` 메소드를 실행하면 목록에서 항목이 하나 제거되는 것도 사이드 이펙트로 볼 수 있습니다.

예제 코드로 보면, 아이템을 삭제하면 모델이 업데이트 되면서 서버에 새로운 목록을 요청하거나 삭제 요청을 보내는 등 다른 동작을 유발할 수 있습니다.
이런 동작들은 뷰 데이터를 갱신하고 서버에 반영하면서 시스템을 자연스럽게 유지합니다.

<hr/>

{@a two-way}
{@a 양방향-바인딩}

<!--
## Two-way binding `[(...)]`
-->
## 양방향 바인딩 `[(...)]`

<!--
Two-way binding gives your app a way to share data between a component class and
its template.

For a demonstration of the syntax and code snippets in this section, see the <live-example name="two-way-binding">two-way binding example</live-example>.
-->
양방향 바인딩(two-way binding)을 사용하면 컴포넌트 클래스와 템플릿이 서로 데이터를 주고받을 수 있습니다.

이 섹션에서 설명하는 내용을 어떻게 동작하는지 확인하려면 <live-example name="two-way-binding">양방향 바인딩 예제</live-example>를 참고하세요.


<!--
### Basics of two-way binding
-->
### 양방향 바인딩 기본

<!--
Two-way binding does two things:

1. Sets a specific element property.
1. Listens for an element change event.

Angular offers a special _two-way data binding_ syntax for this purpose, `[()]`.
The `[()]` syntax combines the brackets
of property binding, `[]`, with the parentheses of event binding, `()`.
-->
양방향 바인딩은 다음 두 가지 용도로 사용합니다:

1. 엘리먼트 프로퍼티의 값을 설정합니다.
1. 프로퍼티 값이 변경되는 이벤트를 감지합니다.

Angular는 _양방향 데이터 바인딩_ 에만 사용하는 `[()]` 표기법을 제공합니다.
`[()]`라는 문법은 프로퍼티 바인딩 문법 `[]`과 이벤트 바인딩 문법 `()`을 동시에 사용하는 형태입니다.


<div class="callout is-important">

<header>
<!--
  [( )] = banana in a box
-->
  [( )] = 상자 안에 든 바나나
</header>

<!--
Visualize a *banana in a box* to remember that the parentheses go _inside_ the brackets.
-->
두 괄호 중 어떤 괄호가 안에 들어가는지 헷갈린다면 *상자 안에 든 바나나* 의 모양을 떠올려 보세요.

</div>

<!--
The `[()]` syntax is easy to demonstrate when the element has a settable
property called `x` and a corresponding event named `xChange`.
Here's a `SizerComponent` that fits this pattern.
It has a `size` value property and a companion `sizeChange` event:
-->
`[()]` 라고 사용하면 컴포넌트에서 이름이 `x`인 프로퍼티가 프로퍼티 바인딩 되면서, 이벤트 이름이 `xChange`인 이벤트가 함께 이벤트 바인딩 됩니다.
`SizerComponent` 예제를 보면서 이 내용을 확인해봅시다.
이 컴포넌트에는 `size` 프로퍼티와 `sizeChange` 이벤트가 선언되어 있습니다.

<code-example path="two-way-binding/src/app/sizer/sizer.component.ts" header="src/app/sizer.component.ts"></code-example>

<code-example path="two-way-binding/src/app/sizer/sizer.component.html" header="src/app/sizer.component.html"></code-example>

<!--
The initial `size` is an input value from a property binding.
Clicking the buttons increases or decreases the `size`, within
min/max value constraints,
and then raises, or emits, the `sizeChange` event with the adjusted size.

Here's an example in which the `AppComponent.fontSizePx` is two-way bound to the `SizerComponent`:
-->
입력 프로퍼티 `size`의 초기값은 프로퍼티 바인딩에 의해 지정됩니다.
그리고 증감 버튼을 누르면 최소/최대값의 범위에 따라 `size` 값이 변경됩니다.
그리고 이때 변경된 값이 담긴 `sizeChange` 이벤트가 발생합니다.

이 때 받은 커스텀 이벤트를 활용해서 `SizerComponent` 의 부모 컴포넌트인 `AppComponent`의 `fontSizePx` 프로퍼티를 양방향 바인딩으로 연결해 봅시다.

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (two-way-1)" region="two-way-1"></code-example>

<!--
The `AppComponent.fontSizePx` establishes the initial `SizerComponent.size` value.
-->
`AppComponent`에서도 `fontSizePx` 프로퍼티의 초기값은 `SizerComponent.size` 값으로 초기화 됩니다.

<code-example path="two-way-binding/src/app/app.component.ts" header="src/app/app.component.ts" region="font-size"></code-example>

<!--
Clicking the buttons updates the `AppComponent.fontSizePx` via the two-way binding.
The revised `AppComponent.fontSizePx` value flows through to the _style_ binding,
making the displayed text bigger or smaller.
-->
그리고 증감 버튼을 누를때마다 `AppComponent.fontSizePx`값이 양방향 바인딩에 의해 갱신됩니다.
이렇게 갱신된 `AppComponent.fontSizePx` 값은 _스타일_ 바인딩으로 연결되면서, `Resizable Text`의 크기가 커지거나 작아집니다.

<!--
The two-way binding syntax is really just syntactic sugar for a _property_ binding and an _event_ binding.
Angular desugars the `SizerComponent` binding into this:
-->
엄밀히 얘기하면, 양방향 바인딩 문법은 _프로퍼티_ 바인딩과 _이벤트_ 바인딩을 하나로 묶어둔 문법 설탕(syntatic sugar)일 뿐입니다.
프로퍼티 바인딩과 이벤트 바인딩을 각각 구현하려면 코드를 다음과 같이 작성합니다:

<code-example path="two-way-binding/src/app/app.component.html" header="src/app/app.component.html (two-way-2)" region="two-way-2"></code-example>

<!--
The `$event` variable contains the payload of the `SizerComponent.sizeChange` event.
Angular assigns the `$event` value to the `AppComponent.fontSizePx` when the user clicks the buttons.
-->
`$event` 객체에는 `SizeComponent.sizeChange` 이벤트에서 보내는 폰트 크기값이 담겨 있습니다.
그래서 사용자가 증감 버튼을 클릭해서 이벤트가 발생할 때마다 `AppComponent.fontSizePx` 프로퍼티의 값을 새로운 값으로 할당하고 있습니다.


<!--
### Two-way binding in forms
-->
### 폼에서 양방향 바인딩 사용하기

<!--
The two-way binding syntax is a great convenience compared to
separate property and event bindings. It would be convenient to
use two-way binding with HTML form elements like `<input>` and
`<select>`. However, no native HTML element follows the `x`
value and `xChange` event pattern.

For more on how to use two-way binding in forms, see
Angular [NgModel](guide/template-syntax#ngModel).
-->
양방향 바인딩 문법을 사용하는 것은 프로퍼티 바인딩 문법과 이벤트 바인딩 문법을 따로 사용하는 것보다 훨씬 편합니다.
`<input>`이나 `<select>`와 같은 HTML 폼 엘리먼트인 경우에 특히 그렇습니다.
그리고 표준 HTML 엘리먼트가 아닌 경우에는 `x` 값이 변경되었을 때 `xChange` 이벤트가 발생하는 패턴으로 구현하는 것을 권장합니다.

폼에서 사용하는 양방향 바인딩에 대해 자세하게 알아보려면 [NgModel](guide/template-syntax#ngModel) 문서를 참고하세요.

<hr/>

<!--
{@a directives}
-->
{@a 디렉티브}

<!--
## Built-in directives
-->
## 기본 디렉티브

<!--
Angular offers two kinds of built-in directives: attribute
directives and structural directives. This segment reviews some of the most common built-in directives,
classified as either [_attribute_ directives](guide/template-syntax#attribute-directives) or [_structural_ directives](guide/template-syntax#structural-directives) and has its own <live-example name="built-in-directives">built-in directives example</live-example>.

For more detail, including how to build your own custom directives, see [Attribute Directives](guide/attribute-directives) and [Structural Directives](guide/structural-directives).
-->
Angular에서 디렉티브는 어트리뷰트 디렉티브와 구조 디렉티브, 이렇게 두 종류입니다.
이번 섹션에서는 자주 사용하는 Angular 기본 디렉티브에 대해 [_어트리뷰트_ 디렉티브](guide/template-syntax#attribute-directives)와 [_구조_ 디렉티브](guide/template-syntax#structural-directives) 차원에서 각각 살펴봅시다. 
직접 실행할 수 있는 예제 앱은 <live-example name="built-in-directives">기본 디렉티브 예제</live-example>를 참고하세요.

커스텀 디렉티브에 대한 내용은 [어트리뷰트 디렉티브](guide/attribute-directives)와 [구조 디렉티브](guide/structural-directives) 문서를 참고하세요.

<hr/>

{@a attribute-directives}
{@a 어트리뷰트-디렉티브}

<!--
### Built-in attribute directives
-->
## 기본 어트리뷰트 디렉티브

<!--
Attribute directives listen to and modify the behavior of
other HTML elements, attributes, properties, and components.
You usually apply them to elements as if they were HTML attributes, hence the name.

Many NgModules such as the [`RouterModule`](guide/router "Routing and Navigation")
and the [`FormsModule`](guide/forms "Forms") define their own attribute directives.
The most common attribute directives are as follows:

* [`NgClass`](guide/template-syntax#ngClass)&mdash;adds and removes a set of CSS classes.
* [`NgStyle`](guide/template-syntax#ngStyle)&mdash;adds and removes a set of HTML styles.
* [`NgModel`](guide/template-syntax#ngModel)&mdash;adds two-way data binding to an HTML form element.
-->
어트리뷰트 디렉티브는 HTML 엘리먼트나 어트리뷰트, 프로퍼티, 컴포넌트의 동작을 조작합니다.
그리고 일반 HTML 어트리뷰트처럼 이름을 지정하는 방식으로 사용합니다.

[`RouterModule`](guide/router "Routing and Navigation")이나 [`FormsModule`](guide/forms "Forms")처럼 모듈이 어트리뷰트 디렉티브를 제공하기도 합니다.
그 중 자주 사용하는 어트리뷰트 디렉티브는 이런 것들이 있습니다:

* [`NgClass`](guide/template-syntax#ngClass)&mdash;CSS 클래스를 추가하거나 제거합니다.
* [`NgStyle`](guide/template-syntax#ngStyle)&mdash;HTML 스타일을 추가하거나 제거합니다.
* [`NgModel`](guide/template-syntax#ngModel)&mdash;HTML 폼 엘리먼트에 양방향 바인딩을 연결합니다.

<hr/>

{@a ngClass}

### `NgClass`

<!--
Add or remove several CSS classes simultaneously with `ngClass`.
-->
`ngClass`를 사용하면 CSS 클래스 여러개를 동시에 추가하거나 제거할 수 있습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="special-div" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

<!--
To add or remove a *single* class, use [class binding](guide/template-syntax#class-binding) rather than `NgClass`.
-->
클래스 *하나를* 조작한다면 `NgClass` 보다 [클래스 바인딩](guide/template-syntax#class-binding)을 사용하는 것이 더 좋습니다.

</div>

<!--
Consider a `setCurrentClasses()` component method that sets a component property,
`currentClasses`, with an object that adds or removes three classes based on the
`true`/`false` state of three other component properties. Each key of the object is a CSS class name; its value is `true` if the class should be added,
`false` if it should be removed.
-->
컴포넌트 메소드 `setCurrentClasses()`는 컴포넌트 프로퍼티 `currentClasses`의 값을 지정하는데, 이 때 지정하는 클래스는 3개이며 다른 컴포넌트 프로퍼티 값에 따라 객체로 구성됩니다.
이 객체의 키(key)는 CSS 클래스 이름이며 키에 연결된 값이 `true`면 클래스가 추가되고 `false`면 클래스가 제거됩니다.

<code-example path="built-in-directives/src/app/app.component.ts" region="setClasses" header="src/app/app.component.ts"></code-example>

<!--
Adding an `ngClass` property binding to `currentClasses` sets the element's classes accordingly:
-->
`currentClasses`는 엘리먼트의 클래스를 지정하기 위해 `ngClass`에 다음과 같이 프로퍼티 바인딩합니다::

<code-example path="built-in-directives/src/app/app.component.html" region="NgClass-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

<!--
Remember that in this situation you'd call `setCurrentClasses()`,
both initially and when the dependent properties change.
-->
이 예제에서는 초기값을 지정하거나 연결된 프로퍼티 값이 변경된 것을 반영하기 위해 `setCurrentClasses()`를 직접 실행했습니다.


</div>

<hr/>

{@a ngStyle}

### `NgStyle`

<!--
Use `NgStyle` to set many inline styles simultaneously and dynamically, based on the state of the component.
-->
`NgStyle`을 사용하면 컴포넌트 상태에 따라 인라인 스타일을 여러개를 동적으로 지정할 수 있습니다.


<!--
#### Without `NgStyle`
-->
#### `NgStyle`을 사용하지 않는 방식

<!--
For context, consider setting a *single* style value with [style binding](guide/template-syntax#style-binding), without `NgStyle`.

<code-example path="built-in-directives/src/app/app.component.html" region="without-ng-style" header="src/app/app.component.html"></code-example>

However, to set *many* inline styles at the same time, use the `NgStyle` directive.

The following is a `setCurrentStyles()` method that sets a component
property, `currentStyles`, with an object that defines three styles,
based on the state of three other component properties:

<code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

Adding an `ngStyle` property binding to `currentStyles` sets the element's styles accordingly:

<code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

Remember to call `setCurrentStyles()`, both initially and when the dependent properties change.
-->
`NgStyle`을 사용하지 않고 스타일 *하나를* [스타일 바인딩](guide/template-syntax#style-binding)하는 코드를 살펴봅니다.

<code-example path="built-in-directives/src/app/app.component.html" region="without-ng-style" header="src/app/app.component.html"></code-example>

이 때 인라인 스타일 *여러 개를* 동시에 지정하려면 `NgStyle` 디렉티브를 사용합니다.

다음 코드에서 `setCurrentStyles()` 메소드는 컴포넌트 프로퍼티 `currentStyles`의 값을 설정합니다. `currentStyles`는 객체로 구성되며 다른 컴포넌트 프로퍼티 값에 따라 3개의 스타일을 지정합니다:

<code-example path="built-in-directives/src/app/app.component.ts" region="setStyles" header="src/app/app.component.ts"></code-example>

그리고 `currentStyles`를 `ngStyle` 디렉티브에 바인딩하려면 다음과 같이 구현합니다:

<code-example path="built-in-directives/src/app/app.component.html" region="NgStyle-2" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

이 예제에서는 초기값을 지정하거나 연결된 프로퍼티 값이 변경된 것을 반영하기 위해 `setCurrentStyles()`를 직접 실행했습니다.

</div>


<hr/>

{@a ngModel}

<!--
### `[(ngModel)]`: Two-way binding
-->
### `[(ngModel)]`: 양방향 바인딩

<!--
The `NgModel` directive allows you to display a data property and
update that property when the user makes changes. Here's an example:

<code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel example)" region="NgModel-1"></code-example>
-->
`NgModel` 디렉티브를 사용하면 데이터의 값을 화면에 표시하면서 이 데이터가 변경되는 것도 감지할 수 있습니다:

<code-example path="built-in-directives/src/app/app.component.html" header="src/app/app.component.html (NgModel 예제)" region="NgModel-1"></code-example>


<!--
#### Import `FormsModule` to use `ngModel`
-->
### `ngModel`을 사용하려면 `FormsModule`을 로드해야 합니다.

<!--
Before using the `ngModel` directive in a two-way data binding,
you must import the `FormsModule` and add it to the NgModule's `imports` list.
Learn more about the `FormsModule` and `ngModel` in [Forms](guide/forms#ngModel).

Remember to import the `FormsModule` to make `[(ngModel)]` available as follows:

<code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule import)" region="import-forms-module"></code-example>

You could achieve the same result with separate bindings to
the `<input>` element's  `value` property and `input` event:

<code-example path="built-in-directives/src/app/app.component.html" region="without-NgModel" header="src/app/app.component.html"></code-example>

To streamline the syntax, the `ngModel` directive hides the details behind its own `ngModel` input and `ngModelChange` output properties:

<code-example path="built-in-directives/src/app/app.component.html" region="NgModelChange" header="src/app/app.component.html"></code-example>

The `ngModel` data property sets the element's value property and the `ngModelChange` event property
listens for changes to the element's value.
-->
`ngModel` 디렉티브로 양방향 바인딩을 구현하려면 NgModule의 `imports` 목록에 `FormsModule`을 추가해야 합니다.
`FormsModule`과 `ngModel`에 대한 자세한 설명은 [Forms](guide/forms#ngModel) 문서를 참고하세요.

NgModule에 `FormsModule` 을 다음과 같이 추가합니다.

<code-example path="built-in-directives/src/app/app.module.ts" header="src/app/app.module.ts (FormsModule 로드하기)" region="import-forms-module"></code-example>

`<input>` 엘리먼트의 경우라면 `value` 프로퍼티와 `input` 이벤트를 따로 바인딩해도 똑같이 동작합니다:

<code-example path="built-in-directives/src/app/app.component.html" region="without-NgModel" header="src/app/app.component.html"></code-example>

이 방식을 간결하게 구현하기 위해 `ngModel` 디렉티브를 사용하면 내부적으로 `ngModel` 입력 프로퍼티와 `ngModelChange` 출력 프로퍼티가 지정됩니다:

<code-example path="built-in-directives/src/app/app.component.html" region="NgModelChange" header="src/app/app.component.html"></code-example>

`ngModel` 프로퍼티는 엘리먼트의 프로퍼티 값을 지정하고 `ngModelChange` 이벤트 프로퍼티는 엘리먼트 값이 변경되는 것을 감지합니다.


<!--
#### `NgModel` and value accessors
-->
#### `NgModel`과 밸류 액세서(value accessor)

<!--
The details are specific to each kind of element and therefore the `NgModel` directive only works for an element
supported by a [ControlValueAccessor](api/forms/ControlValueAccessor)
that adapts an element to this protocol.
Angular provides *value accessors* for all of the basic HTML form elements and the
[Forms](guide/forms) guide shows how to bind to them.

You can't apply `[(ngModel)]` to a non-form native element or a
third-party custom component until you write a suitable value accessor. For more information, see
the API documentation on [DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor).

You don't need a value accessor for an Angular component that
you write because you can name the value and event properties
to suit Angular's basic [two-way binding syntax](guide/template-syntax#two-way)
and skip `NgModel` altogether.
The `sizer` in the
[Two-way Binding](guide/template-syntax#two-way) section is an example of this technique.

Separate `ngModel` bindings are an improvement over binding to the
element's native properties, but you can streamline the binding with a
single declaration using the `[(ngModel)]` syntax:

<code-example path="built-in-directives/src/app/app.component.html" region="NgModel-1" header="src/app/app.component.html"></code-example>

This `[(ngModel)]` syntax can only _set_ a data-bound property.
If you need to do something more, you can write the expanded form;
for example, the following changes the `<input>` value to uppercase:

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

Here are all variations in action, including the uppercase version:
-->
`NgModel` 디렉티브가 동작하는 것은 엘리먼트에 따라 조금씩 다르며, `NgModel` 디렉티브는 [ControlValueAccessor](api/forms/ControlValueAccessor)가 지원하는 엘리먼트에만 사용할 수 있습니다.
여기에서 밸류 액세서는 엘리먼트가 `NgModel`과 어떻게 동작하는지 연결하는 프로토콜이라고 볼 수 있습니다.
Angular는 표준 HTML 폼 엘리먼트에 대한 *밸류 액세서*는 기본으로 지원하며, 밸류 액세서를 사용하는 방법은 [Forms](guide/forms) 문서에서 소개하고 있습니다.

다만, 표준 폼 엘리먼트가 아니거나 서드파티로 불러온 커스텀 엘리먼트가 밸류 액세서를 제공하지 않는다면 `[(ngModel)]`을 사용할 수 없습니다.
자세한 내용은 [DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor) 문서를 참고하세요.

프로퍼티와 이벤트를 바인딩하는 문법이 [양방향 바인딩 문법](guide/template-syntax#two-way)에 맞다면 `NgModel`을 꼭 사용할 필요는 없습니다.
[양방향 바인딩](guide/template-syntax#two-way) 섹션에서 살펴본 `sizer` 프로퍼티가 이렇게 구현되었습니다.

`ngModel` 바인딩을 프로퍼티 바인딩과 이벤트 바인딩으로 나눠서 사용해도 기존 HTML 엘리먼트를 확장하는 것에 변함은 없지만, `[(ngModel)]` 문법으로 작성하면 문법이 좀 더 간단해질 수 있습니다:

<code-example path="built-in-directives/src/app/app.component.html" region="NgModel-1" header="src/app/app.component.html"></code-example>

`[(ngModel)]` 문법은 데이터만 바인딩하는 문법입니다.
이 문법을 사용하면서 값이 변경되는 이벤트를 다른 방식으로 활용하려면 다음과 같이 프로퍼티 바인딩과 이벤트 바인딩을 나눠서 구현하면 됩니다:

<code-example path="built-in-directives/src/app/app.component.html" region="uppercase" header="src/app/app.component.html"></code-example>

`ngModel` 디렉티브는 다음과 같이 다양한 문법으로 사용할 수 있습니다.

<div class="lightbox">
  <img src='generated/images/guide/built-in-directives/ng-model-anim.gif' alt="NgModel variations">
</div>

<hr/>

{@a structural-directives}
{@a 구조-디렉티브}

<!--
## Built-in _structural_ directives
-->
## 기본 _구조_ 디렉티브

<!--
Structural directives are responsible for HTML layout.
They shape or reshape the DOM's structure, typically by adding, removing, and manipulating
the host elements to which they are attached.

This section is an introduction to the common built-in structural directives:

* [`NgIf`](guide/template-syntax#ngIf)&mdash;conditionally creates or destroys subviews from the template.
* [`NgFor`](guide/template-syntax#ngFor)&mdash;repeat a node for each item in a list.
* [`NgSwitch`](guide/template-syntax#ngSwitch)&mdash;a set of directives that switch among alternative views.

<div class="alert is-helpful">

The deep details of structural directives are covered in the
[Structural Directives](guide/structural-directives) guide,
which explains the following:

* Why you
[prefix the directive name with an asterisk (\*)](guide/structural-directives#the-asterisk--prefix).
* Using [`<ng-container>`](guide/structural-directives#ngcontainer "<ng-container>")
to group elements when there is no suitable host element for the directive.
* How to write your own structural directive.
* That you can only apply [one structural directive](guide/structural-directives#one-per-element "one per host element") to an element.

</div>
-->
구조 디렉티브는 DOM 엘리먼트의 모양을 바꾸거나, DOM 트리에서 DOM 엘리먼트를 추가하거나 제거하는 등 HTML 레이아웃을 조작합니다.

그리고 이번 섹션에서는 자주 사용하는 구조 디렉티브에 대해 알아봅시다:

* [`NgIf`](guide/template-syntax#ngIf)&mdash;조건에 따라 템플릿의 일부를 DOM에 추가하거나 제거합니다.
* [`NgFor`](guide/template-syntax#ngFor)&mdash;목록에 있는 아이템마다 노드를 반복합니다.
* [`NgSwitch`](guide/template-syntax#ngSwitch)&mdash;조건에 맞는 노드를 화면에 표시합니다.

<div class="alert is-helpful">

[구조 디렉티브](guide/structural-directives) 문서는 구조 디렉티브에 대해 더 깊이있게 다룹니다.
다음 내용에 대해 궁금하다면 참고해 보세요:

* [디렉티브 이름은 왜 별표(\*)로 시작해야 하는지](guide/structural-directives#the-asterisk--prefix)
* [`<ng-container>`](guide/structural-directives#ngcontainer "<ng-container>")를 사용해서 엘리먼트를 묶는 방법
* 커스텀 구조 디렉티브는 어떻게 구현하는지
* 엘리먼트 하나에는 [구조 디렉티브 하나만](guide/structural-directives#one-per-element "one per host element") 적용할 수 있는지

</div>

<hr/>

{@a ngIf}

### NgIf

<!--
You can add or remove an element from the DOM by applying an `NgIf` directive to
a host element.
Bind the directive to a condition expression like `isActive` in this example.
-->
`NgIf` 디렉티브를 사용하면 조건에 따라 원하는 위치(_호스트 엘리먼트_)에 엘리먼트를 추가하거나 제거할 수 있습니다.
다음 예제에서 보면 `isActive`값에 따라 디렉티브가 뷰에 추가되거나 제거됩니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-1" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

<!--
Don't forget the asterisk (`*`) in front of `ngIf`. For more information
on the asterisk, see the [asterisk (*) prefix](guide/structural-directives#the-asterisk--prefix) section of
[Structural Directives](guide/structural-directives).
-->
`ngIf` 앞에 별표(`*`)를 꼭 붙여야 합니다.
왜 [별표(\*) 접두사](guide/structural-directives#the-asterisk--prefix)를 붙이는지 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives) 문서를 참고하세요.

</div>

<!--
When the `isActive` expression returns a truthy value, `NgIf` adds the
`ItemDetailComponent` to the DOM.
When the expression is falsy, `NgIf` removes the `ItemDetailComponent`
from the DOM, destroying that component and all of its sub-components.
-->
이 코드에서는 `isActive` 표현식의 값이 참으로 평가되면 `NgIf` 디렉티브가 `HeroDetailComponent`를 DOM에 추가합니다.
그리고 표현식의 값이 거짓으로 평가되면 이 컴포넌트를 DOM에서 제거합니다. 이 때 이 컴포넌트와 이 컴포넌트의 하위 컴포넌트는 모두 종료됩니다.


#### Show/hide vs. `NgIf`

<!--
Hiding an element is different from removing it with `NgIf`.
For comparison, the following example shows how to control
the visibility of an element with a
[class](guide/template-syntax#class-binding) or [style](guide/template-syntax#style-binding) binding.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-3" header="src/app/app.component.html"></code-example>

When you hide an element, that element and all of its descendants remain in the DOM.
All components for those elements stay in memory and
Angular may continue to check for changes.
You could be holding onto considerable computing resources and degrading performance
unnecessarily.

`NgIf` works differently. When `NgIf` is `false`, Angular removes the element and its descendants from the DOM.
It destroys their components, freeing up resources, which
results in a better user experience.

If you are hiding large component trees, consider `NgIf` as a more
efficient alternative to showing/hiding.

<div class="alert is-helpful">

For more information on `NgIf` and `ngIfElse`, see the [API documentation about NgIf](api/common/NgIf).

</div>
-->
엘리먼트를 보이지 않게 처리하는 것은 `NgIf`가 DOM에러 엘리먼트를 제거하는 것과 다릅니다.
이 내용을 비교해보기 위해 [클래스 바인딩](guide/template-syntax#class-binding)과 [스타일 바인딩](guide/template-syntax#style-binding)을 사용해서 엘리먼트를 제어하는 예제에 대해 알아봅시다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-3" header="src/app/app.component.html"></code-example>

엘리먼트를 숨기더라도 그 엘리먼트와 자식 엘리먼트는 DOM에 여전히 남아있습니다.
이 컴포넌트들은 메모리에 여전히 남아있으며 Angular의 변화 감지 로직이 동작하는 대상에 이 컴포넌트도 포함됩니다.
자연스럽게 자원 소모도 많아지고 사용자가 느끼는 성능도 좋지 않을 것입니다.

`NgIf`는 다릅니다. `NgIf` 값이 `false`면 Angular는 이 엘리먼트와 자식 엘리먼트를 DOM에서 완전히 제거합니다.
이 때 컴포넌트가 종료되고 자원도 반환되기 때문에 사용자가 느끼는 성능도 더 좋습니다.

그래서 무거운 컴포넌트 트리를 화면에서 감춰야 한다면 show/hide 대신 `NgIf`가 효율적입니다.

<div class="alert is-helpful">

`NgIf`와 `ngIfElse`에 대해 자세하게 알아보려면 [NgIf API 문서](api/common/NgIf)를 참고하세요.

</div>


<!--
#### Guard against null
-->
#### null 방지

<!--
Another advantage of `ngIf` is that you can use it to guard against null. Show/hide
is best suited for very simple use cases, so when you need a guard, opt instead for `ngIf`. Angular will throw an error if a nested expression tries to access a property of `null`.

The following shows `NgIf` guarding two `<div>`s.
The `currentCustomer` name appears only when there is a `currentCustomer`.
The `nullCustomer` will not be displayed as long as it is `null`.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

See also the
[safe navigation operator](guide/template-syntax#safe-navigation-operator "Safe navigation operator (?.)") below.

</div>
-->
`ngIf` 디렉티브는 `null` 값을 방지하는 용도로도 사용할 수 있습니다.
그래서 간단한 방법으로도 템플릿에서 `null` 객체의 프로퍼티에 접근하는 표현식의 에러를 방지할 수 있습니다.

다음과 같이 `NgIf`를 사용한 두 개의 `<div>` 엘리먼트를 봅시다.
`currentCustomer`의 이름은 `currentCustomer` 객체가 존재할 때만 표시됩니다.
그리고 `nullCustomer` 프로퍼티의 값은 `null`이기 때문에 아무것도 표시되지 않을 것입니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2" header="src/app/app.component.html"></code-example>

<code-example path="built-in-directives/src/app/app.component.html" region="NgIf-2b" header="src/app/app.component.html"></code-example>


<div class="alert is-helpful">

[안전 참조 연산자](guide/template-syntax#safe-navigation-operator "Safe navigation operator (?.)") 에 대해서도 확인해 보세요.

</div>
<hr/>

{@a ngFor}
### `NgFor`

<!--
`NgFor` is a repeater directive&mdash;a way to present a list of items.
You define a block of HTML that defines how a single item should be displayed
and then you tell Angular to use that block as a template for rendering each item in the list.
The text assigned to `*ngFor` is the instruction that guides the repeater process.

The following example shows `NgFor` applied to a simple `<div>`. (Don't forget the asterisk (`*`) in front of `ngFor`.)

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

You can also apply an `NgFor` to a component element, as in the following example.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>
-->
`NgForOf`는 템플릿을 반복하는 디렉티브이며, 배열의 각 항목을 뷰에 표시할 때 주로 사용합니다.
이 디렉티브를 사용할 때는 배열의 한 항목을 뷰로 어떻게 표시할지 HTML 템플릿으로 먼저 정의합니다.
그러면 Angular가 템플릿을 반복할 때마다 배열의 항목이 하나씩 전달되면서 뷰를 표시합니다.
`*ngFor`가 어떻게 동작하는지는 이 디렉티브에 전달하는 문자열로 지정합니다.

아래 예제에서는 간단한 `<div>` 엘리먼트에 `NgFor` 디렉티브가 적용되었습니다. (`ngFor` 앞에 별표(`*`)를 빠뜨리지 마세요.)

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1" header="src/app/app.component.html"></code-example>

그리고 다음과 같이 컴포넌트 엘리먼트에도 적용할 수 있습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-2" header="src/app/app.component.html"></code-example>


{@a microsyntax}

<div class="callout is-critical">

<!--
<header>*ngFor microsyntax</header>

The string assigned to `*ngFor` is not a [template expression](guide/template-syntax#template-expressions). Rather,
it's a *microsyntax*&mdash;a little language of its own that Angular interprets.
The string `"let item of items"` means:

> *Take each item in the `items` array, store it in the local `item` looping variable, and
make it available to the templated HTML for each iteration.*

Angular translates this instruction into an `<ng-template>` around the host element,
then uses this template repeatedly to create a new set of elements and bindings for each `item`
in the list.
For more information about microsyntax, see the [Structural Directives](guide/structural-directives#microsyntax) guide.
-->
<header>*ngFor 세부문법(microsyntax)</header>

`*ngFor`에 할당되는 문자열은 [템플릿 표현식](guide/template-syntax#template-expressions)이 아닙니다.
이 문자열은 Angular 인터프리터가 처리하는 작은 언어셋이라고 이해할 수 있습니다.
예를 들어 `"let item of items"`와 같은 문자열이 있다면 이 문자열은:

> *`items` 배열에서 항목을 가져와서 로컬 변수 `item`에 담은 뒤에 이 변수마다 템플릿 HTML을 반복하라는 것을 의미합니다.*

Angular는 호스트 엘리먼트 근처에 `<ng-template>`을 만들어서 이런 동작을 처리합니다.
그리고 새로 만들어지는 엘리먼트마다 `item` 항목을 적용합니다.
세부문법에 대해 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives#microsyntax) 문서를 참고하세요.

</div>


{@a template-input-variable}

{@a template-input-variables}
{@a 템플릿-입력-변수}

<!--
#### Template input variables
-->
#### 템플릿 입력 변수 (Template input variables)

<!--
The `let` keyword before `item` creates a template input variable called `item`.
The `ngFor` directive iterates over the `items` array returned by the parent component's `items` property
and sets `item` to the current item from the array during each iteration.

Reference `item` within the `ngFor` host element
as well as within its descendants to access the item's properties.
The following example references `item` first in an interpolation
and then passes in a binding to the `item` property of the `<app-item-detail>` component.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

For more information about template input variables, see
[Structural Directives](guide/structural-directives#template-input-variable).
-->
`hero` 안에 있는 `let` 키워드는 _템플릿 입력 변수_ `hero`를 만드는 키워드입니다.
그리고 `NgForOf` 디렉티브는 부모 컴포넌트의 `heroes` 배열의 각 항목을 반환하면서 이 문법을 반복하고, 각각의 반복마다 새로운 `hero` 아이템을 템플릿에 적용합니다.

`ngFor`가 사용된 호스트 엘리먼트에서 `item`에 접근할 수 있다는 것은, 이 호스트 엘리먼트의 자식 엘리먼트에서도 `item`에 접근할 수 있다는 것을 의미합니다.
그래서 아래 예제에서 볼 수 있듯이 `ngFor`로 반복할 때 받는 `item` 객체는 자식 컴포넌트인 `<app-item-detail>`로 전달할 수 있습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-1-2" header="src/app/app.component.html"></code-example>

템플릿 입력 변수에 대해 자세하게 알아보려면 [구조 디렉티브](guide/structural-directives#template-input-variable) 문서를 참고하세요.


<!--
#### `*ngFor` with `index`
-->
#### `*ngFor`와 `index`

<!--
The `index` property of the `NgFor` directive context
returns the zero-based index of the item in each iteration.
You can capture the `index` in a template input variable and use it in the template.

The next example captures the `index` in a variable named `i` and displays it with the item name.
-->
`NgForOf` 디렉티브에서 제공하는 `index` 프로퍼티는 반복문이 반복되는 횟수를 나타내는 인덱스입니다.
이 `index` 프로퍼티는 템플릿 입력 변수로 할당 받아 템플릿 안에서 사용할 수 있습니다.

다음 코드는 `index` 프로퍼티를 변수 `i`로 할당하고 히어로의 이름과 함께 표시하는 예제입니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgFor-3" header="src/app/app.component.html"></code-example>

<div class="alert is-helpful">

<!--
`NgFor` is implemented by the `NgForOf` directive. Read more about the other `NgForOf` context values such as `last`, `even`,
and `odd` in the [NgForOf API reference](api/common/NgForOf).
-->
`NgFor`는 `NgForOf` 디렉티브로 만들어진 또 다른 디렉티브입니다. `NgForOf` 컨텍스트에서 제공되는 변수인 `last`나 `even`, `odd`에 대해 더 알아보려면 [NgForOf API 문서](api/common/NgForOf)를 참고하세요.

</div>

{@a trackBy}
<!--
#### *ngFor with `trackBy`
-->
#### *ngFor와 `trackBy`

<!--
If you use `NgFor` with large lists, a small change to one item, such as removing or adding an item, can trigger a cascade of DOM manipulations. For example, re-querying the server could reset a list with all new item objects, even when those items were previously displayed. In this case, Angular sees only a fresh list of new object references and has no choice but to replace the old DOM elements with all new DOM elements.

You can make this more efficient with `trackBy`.
Add a method to the component that returns the value `NgFor` should track.
In this case, that value is the hero's `id`. If the `id` has already been rendered,
Angular keeps track of it and doesn't re-query the server for the same `id`.

<code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

In the microsyntax expression, set `trackBy` to the `trackByItems()` method.

<code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

Here is an illustration of the `trackBy` effect.
"Reset items" creates new items with the same `item.id`s.
"Change ids" creates new items with new `item.id`s.

* With no `trackBy`, both buttons trigger complete DOM element replacement.
* With `trackBy`, only changing the `id` triggers element replacement.
-->
`NgFor`로 복잡한 배열을 순회하면서 이 배열에 있는 항목을 추가하거나 제거하는 경우에는 관련된 DOM 전체가 변화 감지 로직의 대상이 됩니다.
화면에 표시하는 목록을 무시하고 서버에 새로 데이터를 받아 화면을 전체 갱신하는 경우도 이런 경우입니다.
이 경우에는 기존에 있는 항목은 그대로 두고 새로운 항목만 DOM 엘리먼트를 생성하게 할 수 있습니다.

`trackBy`는 이런 경우에 사용합니다.
컴포넌트 클래스에 `NgFor`가 추적하는 값을 반환하는 메소드를 정의합니다.
지금 예제에서는 히어로의 `id`입니다.
그러면 `id`에 해당하는 히어로가 화면에 표시되고 있으면 이 항목을 변경하지 않고 그대로 두게 됩니다.

<code-example path="built-in-directives/src/app/app.component.ts" region="trackByItems" header="src/app/app.component.ts"></code-example>

그리고 세부문법으로 `trackBy`에 `trackByItems()` 메소드를 지정합니다.

<code-example path="built-in-directives/src/app/app.component.html" region="trackBy" header="src/app/app.component.html"></code-example>

`trackBy`가 동작하는 모습을 살펴봅시다.
"Reset items" 버튼을 클릭하면 기존에 있던 `item.id`와 같은 값으로 항목을 생성합니다.
그리고 "Change ids" 버튼을 누르면 새로운 `item.id`로 항목을 생성합니다.

* `trackBy`가 사용되지 않은 곳에서는 두 버튼이 모두 DOM 엘리먼트를 갱신합니다.
* `trackBy`가 사용된 곳에서는 `id`가 바뀐 경우에만 엘리먼트가 갱신됩니다.

<div class="lightbox">
  <img src="generated/images/guide/built-in-directives/ngfor-trackby.gif" alt="Animation of trackBy">
</div>


<div class="alert is-helpful">

<!--
Built-in directives use only public APIs; that is,
they do not have special access to any private APIs that other directives can't access.
-->
기본 디렉티브는 public API만 사용합니다. 다른 디렉티브의 private API에는 접근할 수 없습니다.

</div>

<hr/>

{@a ngSwitch}
<!--
## The `NgSwitch` directives
-->
### `NgSwitch` 디렉티브

<!--
NgSwitch is like the JavaScript `switch` statement.
It displays one element from among several possible elements, based on a switch condition.
Angular puts only the selected element into the DOM.
-->
*NgSwitch* 디렉티브는 JavaScript의 `switch` 문법과 비슷합니다.
이 디렉티브는 가능한 경우 몇가지 중에서 _스위치 조건_ 에 만족하는 엘리먼트 _하나를_ 뷰에 표시합니다.
이 때 *선택된* 엘리먼트만 DOM에 추가되며, 조건을 만족하지 않는 엘리먼트들은 DOM에 존재하지 않습니다.

<!-- API Flagged -->
<!--
`NgSwitch` is actually a set of three, cooperating directives:
`NgSwitch`, `NgSwitchCase`, and `NgSwitchDefault` as in the following example.
-->
`NgSwitch`는 일반적으로 `NgSwitch`, `NgSwitchCase`, `NgSwitchDefault` 3개의 디렉티브를 함께 의미합니다:

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch" header="src/app/app.component.html"></code-example>

<div class="lightbox">
  <img src="generated/images/guide/built-in-directives/ngswitch.gif" alt="Animation of NgSwitch">
</div>

<!--
`NgSwitch` is the controller directive. Bind it to an expression that returns
the *switch value*, such as `feature`. Though the `feature` value in this
example is a string, the switch value can be of any type.

**Bind to `[ngSwitch]`**. You'll get an error if you try to set `*ngSwitch` because
`NgSwitch` is an *attribute* directive, not a *structural* directive.
Rather than touching the DOM directly, it changes the behavior of its companion directives.

**Bind to `*ngSwitchCase` and `*ngSwitchDefault`**.
The `NgSwitchCase` and `NgSwitchDefault` directives are _structural_ directives
because they add or remove elements from the DOM.

* `NgSwitchCase` adds its element to the DOM when its bound value equals the switch value and removes
its bound value when it doesn't equal the switch value.

* `NgSwitchDefault` adds its element to the DOM when there is no selected `NgSwitchCase`.

The switch directives are particularly useful for adding and removing *component elements*.
This example switches among four `item` components defined in the `item-switch.components.ts` file.
Each component has an `item` [input property](guide/template-syntax#inputs-outputs "Input property")
which is bound to the `currentItem` of the parent component.

Switch directives work as well with native elements and web components too.
For example, you could replace the `<app-best-item>` switch case with the following.
-->
`NgSwitch`는 해당하는 조건을 선택하는 디렉티브입니다. 이 디렉티브는 템플릿 표현식이 반환하는 값에 해당하는 *특정 조건*을 선택합니다.
위 예제에서는 문자열 타입의 `emotion` 변수로 조건을 판단했지만, 타입은 자유롭게 사용할 수 있습니다.

스위칭 조건을 판단하는 템플릿 표현식은 **`[ngSwitch]`** 와 같이 바인딩합니다.
이 때 문법을 `*ngSwitch`로 사용해도 되지 않을까 생각할 수 있지만, `NgSwitch`는 *구조* 디렉티브가 아니라 *어트리뷰트* 디렉티브이기 때문에 `*ngSwitch`로 사용하면 에러가 발생합니다.
Rather than touching the DOM directly, it changes the behavior of its companion directives.

`NgSwitch`와는 다르게 `NgSwitchCase`와 `NgSwitchDefault`는 _구조_ 디렉티브이며, `*ngSwitchCase`, `*ngSwitchDefault`와 같이 사용합니다.
두 디렉티브는 DOM에 엘리먼트를 직접 추가하거나 제거하는 디렉티브입니다.

* `NgSwitchCase`는 스위칭 조건이 맞을 때 해당 엘리먼트를 DOM에 추가하며, 조건에 맞지 않으면 해당 엘리먼트를 제거합니다.
* `NgSwitchDefault`는 `NgSwitchCase`가 하나도 선택되지 않았을 때 DOM에 추가하는 엘리먼트를 지정합니다.

스위치 디렉티브는 *컴포넌트 엘리먼트를* DOM에 추가하거나 제거하는 용도로도 많이 사용합니다.
위에서 살펴본 예제는 `item-switch.component.ts` 파일에 정의된 컴포넌트 4개를 하나씩 선택해서 적용하는 예제입니다.
각각의 컴포넌트는 부모 컴포넌트에서 전달되는 `currentItem` 프로퍼티를 `item`를 [입력 프로퍼티](guide/template-syntax#inputs-outputs "Input property")로 바인딩합니다.

그리고 스위치 디렉티브는 네이티브 엘리먼트나 웹 컴포넌트에도 자연스럽게 적용할 수 있습니다.
위 예제에서 `<confused-hero>`에 사용했던 스위치 디렉티브는 다음과 같이 네이티브 엘리먼트에도 사용할 수 있습니다.

<code-example path="built-in-directives/src/app/app.component.html" region="NgSwitch-div" header="src/app/app.component.html"></code-example>

<hr/>

{@a template-reference-variable}

{@a template-reference-variables--var-}

{@a ref-vars}

{@a ref-var}

{@a 템플릿-참조-변수}

<!--
## Template reference variables (`#var`)
-->
## 템플릿 참조 변수 (`#var`)

<!--
A **template reference variable** is often a reference to a DOM element within a template.
It can also refer to a directive (which contains a component), an element, [TemplateRef](api/core/TemplateRef), or a <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">web component</a>.

For a demonstration of the syntax and code snippets in this section, see the <live-example name="template-reference-variables">template reference variables example</live-example>.


Use the hash symbol (#) to declare a reference variable.
The following reference variable, `#phone`, declares a `phone` variable on an `<input>` element.
-->
**템플릿 참조 변수**는 템플릿 안에서 DOM 엘리먼트를 가리킬 때 사용합니다.
그리고 디렉티브나 엘리먼트, [TemplateRef](api/core/TemplateRef), <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" title="MDN: Web Components">웹 컴포넌트</a>를 가리킬 때도 사용합니다.

이 섹션에서 설명하는 내용을 직접 확인하려면 <live-example name="template-reference-variables">템플릿 참조 변수 예제</live-example>를 참고하세요.

참조 변수는 해시 기호(#)를 사용해서 정의합니다.
예를 들어, `<input>` 엘리먼트를 `phone` 변수로 가리키려면 `#phone` 과 같이 정의합니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-var" header="src/app/app.component.html"></code-example>

<!--
You can refer to a template reference variable anywhere in the component's template.
Here, a `<button>` further down the template refers to the `phone` variable.
-->
컴포넌트 템플릿에서는 어디에서라도 템플릿 참조 변수를 사용할 수 있습니다.
아래 예제에서 `<button>` 엘리먼트는 `phone`으로 지정된 엘리먼트의 값을 참조합니다.

<code-example path="template-reference-variables/src/app/app.component.html" region="ref-phone" header="src/app/app.component.html"></code-example>

<!--
<h3 class="no-toc">How a reference variable gets its value</h3>
-->
<h3 class="no-toc">참조 변수를 사용해서 입력값 얻기</h3>

In most cases, Angular sets the reference variable's value to the element on which it is declared.
In the previous example, `phone` refers to the phone number `<input>`.
The button's click handler passes the `<input>` value to the component's `callPhone()` method.

The `NgForm` directive can change that behavior and set the value to something else. In the following example, the template reference variable, `itemForm`, appears three times separated
by HTML.

<code-example path="template-reference-variables/src/app/app.component.html" region="ngForm" header="src/app/hero-form.component.html"></code-example>

The reference value of itemForm, without the ngForm attribute value, would be
the [HTMLFormElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement).
There is, however, a difference between a Component and a Directive in that a `Component`
will be referenced without specifying the attribute value, and a `Directive` will not
change the implicit reference (that is, the element).



However, with `NgForm`, `itemForm` is a reference to the [NgForm](api/forms/NgForm "API: NgForm")
directive with the ability to track the value and validity of every control in the form.

The native `<form>` element doesn't have a `form` property, but the `NgForm` directive does, which allows disabling the submit button
if the `itemForm.form.valid` is invalid and passing the entire form control tree
to the parent component's `onSubmit()` method.

<h3 class="no-toc">Template reference variable considerations</h3>

A template _reference_ variable (`#phone`) is not the same as a template _input_ variable (`let phone`) such as in an [`*ngFor`](guide/template-syntax#template-input-variable).
See [_Structural Directives_](guide/structural-directives#template-input-variable) for more information.

The scope of a reference variable is the entire template. So, don't define the same variable name more than once in the same template as the runtime value will be unpredictable.

#### Alternative syntax

<!--
You can use the `ref-` prefix alternative to `#`.
This example declares the `fax` variable as `ref-fax` instead of `#fax`.
-->
`#` 기호를 사용하는 것이 어색하다면 `ref-` 접두사를 대신 사용할 수도 있습니다.
접두사를 사용해서 `ref-fax` 라고 작성하면 `#fax` 로 `fax` 변수를 정의한 것과 같습니다.


<code-example path="template-reference-variables/src/app/app.component.html" region="ref-fax" header="src/app/app.component.html"></code-example>


<hr/>

{@a inputs-outputs}
{@a 입출력 프로퍼티}

## `@Input()` and `@Output()` properties

`@Input()` and `@Output()` allow Angular to share data between the parent context
and child directives or components. An `@Input()` property is writable
while an `@Output()` property is observable.

Consider this example of a child/parent relationship:

```html
<parent-component>
  <child-component></child-component>
</parent-component>

```

Here, the `<child-component>` selector, or child directive, is embedded
within a `<parent-component>`, which serves as the child's context.

`@Input()` and `@Output()` act as
the API, or application programming interface, of the child
component in that they allow the child to
communicate with the parent. Think of `@Input()` and `@Output()` like ports
or doorways&mdash;`@Input()` is the doorway into the component allowing data
to flow in while `@Output()` is the doorway out of the component, allowing the
child component to send data out.

This section about `@Input()` and `@Output()` has its own <live-example name="inputs-outputs"></live-example>. The following subsections highlight
key points in the sample app.

<div class="alert is-helpful">

#### `@Input()` and `@Output()` are independent

Though `@Input()` and `@Output()` often appear together in apps, you can use
them separately. If the nested
component is such that it only needs to send data to its parent, you wouldn't
need an `@Input()`, only an `@Output()`. The reverse is also true in that if the
child only needs to receive data from the parent, you'd only need `@Input()`.

</div>

{@a input}

## How to use `@Input()`

Use the `@Input()` decorator in a child component or directive to let Angular know
that a property in that component can receive its value from its parent component.
It helps to remember that the data flow is from the perspective of the
child component. So an `@Input()` allows data to be input _into_ the
child component from the parent component.


<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input.svg" alt="Input data flow diagram">
</div>

To illustrate the use of `@Input()`, edit these parts of your app:

* The child component class and template
* The parent component class and template


### In the child

To use the `@Input()` decorator in a child component class, first import
`Input` and then decorate the property with `@Input()`:

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.ts" region="use-input" header="src/app/item-detail/item-detail.component.ts"></code-example>


In this case, `@Input()` decorates the property <code class="no-auto-link">item</code>, which has
a type of `string`, however, `@Input()` properties can have any type, such as
`number`, `string`, `boolean`, or `object`. The value for `item` will come from the parent component, which the next section covers.

Next, in the child component template, add the following:

<code-example path="inputs-outputs/src/app/item-detail/item-detail.component.html" region="property-in-template" header="src/app/item-detail/item-detail.component.html"></code-example>



### In the parent

The next step is to bind the property in the parent component's template.
In this example, the parent component template is `app.component.html`.

First, use the child's selector, here `<app-item-detail>`, as a directive within the
parent component template. Then, use [property binding](guide/template-syntax#property-binding)
to bind the property in the child to the property of the parent.

<code-example path="inputs-outputs/src/app/app.component.html" region="input-parent" header="src/app/app.component.html"></code-example>

Next, in the parent component class, `app.component.ts`, designate a value for `currentItem`:

<code-example path="inputs-outputs/src/app/app.component.ts" region="parent-property" header="src/app/app.component.ts"></code-example>

With `@Input()`, Angular passes the value for `currentItem` to the child so that `item` renders as `Television`.

The following diagram shows this structure:

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-diagram-target-source.svg" alt="Property binding diagram">
</div>

The target in the square brackets, `[]`, is the property you decorate
with `@Input()` in the child component. The binding source, the part
to the right of the equal sign, is the data that the parent
component passes to the nested component.

The key takeaway is that when binding to a child component's property in a parent component&mdash;that is, what's
in square brackets&mdash;you must
decorate the property with `@Input()` in the child component.

<div class="alert is-helpful">

#### `OnChanges` and `@Input()`

To watch for changes on an `@Input()` property, use
`OnChanges`, one of Angular's [lifecycle hooks](guide/lifecycle-hooks#onchanges).
`OnChanges` is specifically designed to work with properties that have the
`@Input()` decorator. See the [`OnChanges`](guide/lifecycle-hooks#onchanges) section of the [Lifecycle Hooks](guide/lifecycle-hooks) guide for more details and examples.

</div>

{@a output}

## How to use `@Output()`

Use the `@Output()` decorator in the child component or directive to allow data to flow from
the child _out_ to the parent.

An `@Output()` property should normally be initialized to an Angular [`EventEmitter`](api/core/EventEmitter) with values flowing out of the component as [events](#event-binding).


<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/output.svg" alt="Output diagram">
</div>

Just like with `@Input()`, you can use `@Output()`
on a property of the child component but its type should be
`EventEmitter`.

`@Output()` marks a property in a child component as a doorway
through which data can travel from the child to the parent.
The child component then has to raise an event so the
parent knows something has changed. To raise an event,
`@Output()` works hand in hand with `EventEmitter`,
which is a class in `@angular/core` that you
use to emit custom events.

When you use `@Output()`, edit these parts of your app:

* The child component class and template
* The parent component class and template


The following example shows how to set up an `@Output()` in a child
component that pushes data you enter in an HTML `<input>` to an array in the
parent component.

<div class="alert is-helpful">

The HTML element `<input>` and the Angular decorator `@Input()`
are different. This documentation is about component communication in Angular as it pertains to `@Input()` and `@Output()`. For more information on the HTML element `<input>`, see the [W3C Recommendation](https://www.w3.org/TR/html5/sec-forms.html#the-input-element).

</div>

### In the child

This example features an `<input>` where a user can enter a value and click a `<button>` that raises an event. The `EventEmitter` then relays the data to the parent component.

First, be sure to import `Output` and `EventEmitter`
in the child component class:

```js
import { Output, EventEmitter } from '@angular/core';

```

Next, still in the child, decorate a property with `@Output()` in the component class.
The following example `@Output()` is called `newItemEvent` and its type is
`EventEmitter`, which means it's an event.


<code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output" header="src/app/item-output/item-output.component.ts"></code-example>

The different parts of the above declaration are as follows:

* `@Output()`&mdash;a decorator function marking the property as a way for data to go from the child to the parent
* `newItemEvent`&mdash;the name of the `@Output()`
* `EventEmitter<string>`&mdash;the `@Output()`'s type
* `new EventEmitter<string>()`&mdash;tells Angular to create a new event emitter and that the data it emits is of type string. The type could be any type, such as `number`, `boolean`, and so on. For more information on `EventEmitter`, see the [EventEmitter API documentation](api/core/EventEmitter).

Next, create an `addNewItem()` method in the same component class:

<code-example path="inputs-outputs/src/app/item-output/item-output.component.ts" region="item-output-class" header="src/app/item-output/item-output.component.ts"></code-example>

The `addNewItem()` function uses the `@Output()`, `newItemEvent`,
to raise an event in which it emits the value the user
types into the `<input>`. In other words, when
the user clicks the add button in the UI, the child lets the parent know
about the event and gives that data to the parent.

#### In the child's template

The child's template has two controls. The first is an HTML `<input>` with a
[template reference variable](guide/template-syntax#ref-var) , `#newItem`,
where the user types in an item name. Whatever the user types
into the `<input>` gets stored in the `#newItem` variable.

<code-example path="inputs-outputs/src/app/item-output/item-output.component.html" region="child-output" header="src/app/item-output/item-output.component.html"></code-example>

The second element is a `<button>`
with an [event binding](guide/template-syntax#event-binding). You know it's
an event binding because the part to the left of the equal
sign is in parentheses, `(click)`.

The `(click)` event is bound to the `addNewItem()` method in the child component class which
takes as its argument whatever the value of `#newItem` is.

Now the child component has an `@Output()`
for sending data to the parent and a method for raising an event.
The next step is in the parent.

### In the parent

In this example, the parent component is `AppComponent`, but you could use
any component in which you could nest the child.

The `AppComponent` in this example features a list of `items`
in an array and a method for adding more items to the array.

<code-example path="inputs-outputs/src/app/app.component.ts" region="add-new-item" header="src/app/app.component.ts"></code-example>

The `addItem()` method takes an argument in the form of a string
and then pushes, or adds, that string to the `items` array.

#### In the parent's template

Next, in the parent's template, bind the parent's
method to the child's event. Put the child selector, here `<app-item-output>`,
within the parent component's
template, `app.component.html`.

<code-example path="inputs-outputs/src/app/app.component.html" region="output-parent" header="src/app/app.component.html"></code-example>

The event binding, `(newItemEvent)='addItem($event)'`, tells
Angular to connect the event in the child, `newItemEvent`, to
the method in the parent, `addItem()`, and that the event that the child
is notifying the parent about is to be the argument of `addItem()`.
In other words, this is where the actual hand off of data takes place.
The `$event` contains the data that the user types into the `<input>`
in the child template UI.

Now, in order to see the `@Output()` working, add the following to the parent's template:

```html
  <ul>
    <li *ngFor="let item of items">{{item}}</li>
  </ul>
  ```

The `*ngFor` iterates over the items in the `items` array. When you enter a value in the child's `<input>` and click the button, the child emits the event and the parent's `addItem()` method pushes the value to the `items` array and it renders in the list.


## `@Input()` and `@Output()` together

You can use `@Input()` and `@Output()` on the same child component as in the following:

<code-example path="inputs-outputs/src/app/app.component.html" region="together" header="src/app/app.component.html"></code-example>

The target, `item`, which is an `@Input()` property in the child component class, receives its value from the parent's property, `currentItem`. When you click delete, the child component raises an event, `deleteRequest`, which is the argument for the parent's `crossOffItem()` method.

The following diagram is of an `@Input()` and an `@Output()` on the same
child component and shows the different parts of each:

<div class="lightbox">
  <img src="generated/images/guide/inputs-outputs/input-output-diagram.svg" alt="Input/Output diagram">
</div>

As the diagram shows, use inputs and outputs together in the same manner as using them separately. Here, the child selector is `<app-input-output>` with `item` and `deleteRequest` being `@Input()` and `@Output()`
properties in the child component class. The property `currentItem` and the method `crossOffItem()` are both in the parent component class.

To combine property and event bindings using the banana-in-a-box
syntax, `[()]`, see [Two-way Binding](guide/template-syntax#two-way).

For more detail on how these work, see the previous sections on [Input](guide/template-syntax#input) and [Output](guide/template-syntax#output). To see it in action, see the <live-example name="inputs-outputs">Inputs and Outputs Example</live-example>.

## `@Input()` and `@Output()` declarations

Instead of using the `@Input()` and `@Output()` decorators
to declare inputs and outputs, you can identify
members in the `inputs` and `outputs` arrays
of the directive metadata, as in this example:

<code-example path="inputs-outputs/src/app/in-the-metadata/in-the-metadata.component.ts" region="metadata" header="src/app/in-the-metadata/in-the-metadata.component.ts"></code-example>

While declaring `inputs` and `outputs` in the `@Directive` and `@Component`
metadata is possible, it is a better practice to use the `@Input()` and `@Output()`
class decorators instead, as follows:

<code-example path="inputs-outputs/src/app/input-output/input-output.component.ts" region="input-output" header="src/app/input-output/input-output.component.ts"></code-example>

See the [Decorate input and output properties](guide/styleguide#decorate-input-and-output-properties) section of the
[Style Guide](guide/styleguide) for details.



<div class="alert is-helpful">

If you get a template parse error when trying to use inputs or outputs, but you know that the
properties do indeed exist, double check
that your properties are annotated with `@Input()` / `@Output()` or that you've declared
them in an `inputs`/`outputs` array:

<code-example language="bash">
Uncaught Error: Template parse errors:
Can't bind to 'item' since it isn't a known property of 'app-item-detail'
</code-example>

</div>

{@a aliasing-io}

## Aliasing inputs and outputs

Sometimes the public name of an input/output property should be different from the internal name. While it is a best practice to avoid this situation, Angular does
offer a solution.

### Aliasing in the metadata

Alias inputs and outputs in the metadata using a colon-delimited (`:`) string with
the directive property name on the left and the public alias on the right:

<code-example path="inputs-outputs/src/app/aliasing/aliasing.component.ts" region="alias" header="src/app/aliasing/aliasing.component.ts"></code-example>


### Aliasing with the `@Input()`/`@Output()` decorator

You can specify the alias for the property name by passing the alias name to the `@Input()`/`@Output()` decorator. The internal name remains as usual.

<code-example path="inputs-outputs/src/app/aliasing/aliasing.component.ts" region="alias-input-output" header="src/app/aliasing/aliasing.component.ts"></code-example>


<hr/>

{@a expression-operators}

{@a 템플릿-표현식-전용-연산자}

<!--
## Template expression operators
-->
## 템플릿 표현식 전용 연산자

The Angular template expression language employs a subset of JavaScript syntax supplemented with a few special operators
for specific scenarios. The next sections cover three of these operators:

* [pipe](guide/template-syntax#pipe)
* [safe navigation operator](guide/template-syntax#safe-navigation-operator)
* [non-null assertion operator](guide/template-syntax#non-null-assertion-operator)

{@a pipe}

<!--
### The pipe operator (`|`)
-->
### 파이프 연산자 (`|`)

<!--
The result of an expression might require some transformation before you're ready to use it in a binding.
For example, you might display a number as a currency, change text to uppercase, or filter a list and sort it.

Pipes are simple functions that accept an input value and return a transformed value.
They're easy to apply within template expressions, using the pipe operator (`|`):
-->
템플릿 표현식의 결과값을 그대로 사용하지 않고 바인딩하기 전에 적당한 형태로 변환해야 하는 경우가 있습니다.
숫자를 화폐 단위로 표시하거나, 문자열을 대문자로 변환하거나, 배열의 일부를 필터링하거나 정렬하는 경우가 이런 경우에 해당됩니다.

파이프는 입력값을 간단하게 변환해서 새로운 값으로 반환하는 함수입니다.
템플릿에서는 다음과 같이 **파이프 연산자 (`|`)**를 사용해서 적용할 수 있습니다:

<code-example path="template-expression-operators/src/app/app.component.html" region="uppercase-pipe" header="src/app/app.component.html"></code-example>

<!--
The pipe operator passes the result of an expression on the left to a pipe function on the right.
-->
파이프 연산자 왼쪽에 있는 값은 파이프 연산자의 오른쪽으로 전달됩니다.

<!--
You can chain expressions through multiple pipes:
-->
그래서 다음과 같이 파이프 여러개를 연달아 사용할 수도 있습니다:

<code-example path="template-expression-operators/src/app/app.component.html" region="pipe-chain" header="src/app/app.component.html"></code-example>

<!--
And you can also [apply parameters](guide/pipes#parameterizing-a-pipe) to a pipe:
-->
그리고 파이프 함수에 [파이프 인자](guide/pipes#파이프-인자-사용하기)를 전달해서 파이프의 동작을 구체적으로 지정할 수도 있습니다:

<code-example path="template-expression-operators/src/app/app.component.html" region="date-pipe" header="src/app/app.component.html"></code-example>

<!--
The `json` pipe is particularly helpful for debugging bindings:
-->
바인딩되는 객체를 확인해야 할때 `json` 파이프를 사용하면 디버깅이 훨씬 편해집니다:

<code-example path="template-expression-operators/src/app/app.component.html" region="json-pipe" header="src/app/app.component.html"></code-example>

<!--
The generated output would look something like this:
-->
이 코드를 실행하면 화면에 다음과 같은 문자열이 표시됩니다:

<code-example language="json">
  { "name": "Telephone",
    "manufactureDate": "1980-02-25T05:00:00.000Z",
    "price": 98 }
</code-example>

<div class="alert is-helpful">

The pipe operator has a higher precedence than the ternary operator (`?:`),
which means `a ? b : c | x` is parsed as `a ? b : (c | x)`.
Nevertheless, for a number of reasons,
the pipe operator cannot be used without parentheses in the first and second operands of `?:`.
A good practice is to use parentheses in the third operand too.

</div>


<hr/>

{@a safe-navigation-operator}

### The safe navigation operator ( `?` ) and null property paths

The Angular safe navigation operator, `?`, guards against `null` and `undefined`
values in property paths. Here, it protects against a view render failure if `item` is `null`.

<code-example path="template-expression-operators/src/app/app.component.html" region="safe" header="src/app/app.component.html"></code-example>

If `item` is `null`, the view still renders but the displayed value is blank; you see only "The item name is:" with nothing after it.

Consider the next example, with a `nullItem`.

<code-example language="html">
  The null item name is {{nullItem.name}}
</code-example>

Since there is no safe navigation operator and `nullItem` is `null`, JavaScript and Angular would throw a `null` reference error and break the rendering process of Angular:

<code-example language="bash">
  TypeError: Cannot read property 'name' of null.
</code-example>

<!--
Sometimes however, `null` values in the property
path may be OK under certain circumstances,
especially when the value starts out null but the data arrives eventually.

With the safe navigation operator, `?`, Angular stops evaluating the expression when it hits the first `null` value and renders the view without errors.

It works perfectly with long property paths such as `a?.b?.c?.d`.
-->
Sometimes however, `null` values in the property
path may be OK under certain circumstances,
especially when the value starts out null but the data arrives eventually.

With the safe navigation operator, `?`, Angular stops evaluating the expression when it hits the first `null` value and renders the view without errors.

안전 참조 연산자는 `a?.b?.c?.d`와 같은 경우에도 완벽하게 동작합니다.


<hr/>

{@a non-null-assertion-operator}

{@a null-방지-연산자}
<!--
### The non-null assertion operator ( `!` )
-->
### null 방지 연산자 ( `!` )

<!--
As of Typescript 2.0, you can enforce [strict null checking](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript") with the `--strictNullChecks` flag. TypeScript then ensures that no variable is unintentionally null or undefined.

In this mode, typed variables disallow `null` and `undefined` by default. The type checker throws an error if you leave a variable unassigned or try to assign `null` or `undefined` to a variable whose type disallows `null` and `undefined`.

The type checker also throws an error if it can't determine whether a variable will be `null` or undefined at runtime. You tell the type checker not to throw an error by applying the postfix
[non-null assertion operator, !](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "Non-null assertion operator").

The Angular non-null assertion operator, `!`, serves the same purpose in
an Angular template. For example, after you use [*ngIf](guide/template-syntax#ngIf)
to check that `item` is defined, you can assert that
`item` properties are also defined.
-->
TypeScript 2.0 버전부터  [null 검사를 더 엄격하게](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html "Strict null checking in TypeScript")하는 옵션이 추가되었습니다. 옵션은 `--strictNullChecks`로 활성화하며, 이 옵션을 설정하면 객체의 값이 null이나 undefined이 되는 것을 방지합니다.

이 모드를 활성화하면 타입을 지정한 변수에 null이나 undefined을 할당하는 것이 허용되지 않습니다. 그래서 변수의 값을 할당하지 않고 놔두거나, 변수에 null이나 undefined을 할당하는 코드가 있으면 타입을 체크할 때 오류가 발생합니다.

그런데 TypeScript 컴파일러는 앱이 실행되는 시점에 변수의 값이 null이나 undefined가 될 수 있는 코드에서도 에러를 발생합니다.
개발자는 발생하지 않는 경우라고 할 수 있지만 TypeScript 컴파일러가 알수는 없기 때문이죠.
그래서 실행시점에서도 이 객체가 null이 되지 않는다는 것을 [null 방지 연산자](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator "Non-null assertion operator")를 사용해서 TypeScript 컴파일러에게 알려줘야 합니다.

The Angular non-null assertion operator, `!`, serves the same purpose in
an Angular template. For example, after you use [*ngIf](guide/template-syntax#ngIf)
to check that `item` is defined, you can assert that
`item` properties are also defined.

<code-example path="template-expression-operators/src/app/app.component.html" region="non-null" header="src/app/app.component.html"></code-example>

When the Angular compiler turns your template into TypeScript code,
it prevents TypeScript from reporting that `item` might be `null` or `undefined`.

Unlike the [_safe navigation operator_](guide/template-syntax#safe-navigation-operator "Safe navigation operator (?)"),
the non-null assertion operator does not guard against `null` or `undefined`.
Rather, it tells the TypeScript type checker to suspend strict `null` checks for a specific property expression.

The non-null assertion operator, `!`, is optional with the exception that you must use it when you turn on strict null checks.

<a href="#top-of-page">back to top</a>

<hr/>

{@a built-in-template-functions}

<!--
## Built-in template functions
-->
## 기본 템플릿 함수

{@a any-type-cast-function}
{@a any-타입-캐스팅-함수}

<!--
### The `$any()` type cast function
-->
### `$any` 타입 캐스팅 함수

<!--
Sometimes a binding expression triggers a type error during [AOT compilation](guide/aot-compiler) and it is not possible or difficult to fully specify the type.
To silence the error, you can use the `$any()` cast function to cast
the expression to the [`any` type](http://www.typescriptlang.org/docs/handbook/basic-types.html#any) as in the following example:
-->
바인딩 표현식을 사용하다보면 [AOT 컴파일러](guide/aot-compiler)로 컴파일할 때 변수 타입에 맞지 않다는 에러가 발생하지만, 이 객체의 타입을 특정지을 수 없는 경우가 종종 발생합니다.
이 에러를 없애려면 `$any()` 타입 캐스팅 함수를 사용해서 바인딩 표현식의 결과값이 [`any` 타입](http://www.typescriptlang.org/docs/handbook/basic-types.html#any)이 되도록 변환할 수 있습니다.

<code-example path="built-in-template-functions/src/app/app.component.html" region="any-type-cast-function-1" header="src/app/app.component.html"></code-example>

<!--
When the Angular compiler turns this template into TypeScript code,
it prevents TypeScript from reporting that `bestByDate` is not a member of the `item`
object when it runs type checking on the template.

The `$any()` cast function also works with `this` to allow access to undeclared members of
the component.
-->
Angular 컴파일러가 이 템플릿 코드를 TypeScript 코드로 변환하고 나면 `item` 객체에 `bestByDate` 멤버가 없더라도 이제는 에러를 발생시키지 않고 그대로 실행됩니다.

그리고 템플릿에서 `this`를 사용해서 컴포넌트 클래스에 직접 접근할 때도 `$any` 캐스트 함수를 사용할 수 있습니다.

<code-example path="built-in-template-functions/src/app/app.component.html" region="any-type-cast-function-2" header="src/app/app.component.html"></code-example>

<!--
The `$any()` cast function works anywhere in a binding expression where a method call is valid.
-->
`$any()` 캐스팅 함수는 함수를 실행할 수 있는 바인딩 표현식이라면 어디에나 자유롭게 사용할 수 있습니다.

## SVG in templates

It is possible to use SVG as valid templates in Angular. All of the template syntax below is
applicable to both SVG and HTML. Learn more in the SVG [1.1](https://www.w3.org/TR/SVG11/) and
[2.0](https://www.w3.org/TR/SVG2/) specifications.

Why would you use SVG as template, instead of simply adding it as image to your application?

When you use an SVG as the template, you are able to use directives and bindings just like with HTML
templates. This means that you will be able to dynamically generate interactive graphics.

Refer to the sample code snippet below for a syntax example:

<code-example path="template-syntax/src/app/svg.component.ts" header="src/app/svg.component.ts"></code-example>

Add the following code to your `svg.component.svg` file:

<code-example path="template-syntax/src/app/svg.component.svg" header="src/app/svg.component.svg"></code-example>

Here you can see the use of a `click()` event binding and the property binding syntax
(`[attr.fill]="fillColor"`).
