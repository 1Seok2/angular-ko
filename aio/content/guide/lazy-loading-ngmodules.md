<!--
# Lazy-loading feature modules
-->
# 기능모듈 지연로딩 하기

<!--
By default, NgModules are eagerly loaded, which means that as soon as the app loads, so do all the NgModules, whether or not they are immediately necessary. For large apps with lots of routes, consider lazy loading&mdash;a design pattern that loads NgModules as needed. Lazy loading helps keep initial
bundle sizes smaller, which in turn helps decrease load times.

<div class="alert is-helpful">

For the final sample app with two lazy-loaded modules that this page describes, see the
<live-example></live-example>.

</div>
-->
기본적으로 NgModule은 즉시 로드 됩니다. 이 말은 앱이 로드되면 사용여부와 관계없이 앱에 있는 NgModule이 모두 로드된다는 것을 의미합니다.
이 때 앱 구조가 복잡해서 라우팅 규칙도 복잡하다면 지연 로딩(lazy-loading)을 활용해서 당장 사용하지 않는 모듈을 나중에 로드하는 방법을 고려해볼 수 있습니다.
지연 로딩을 활용하면 앱 초기 실행에 필요한 빌드 결과물 크기가 작아지기 때문에 앱 초기 실행 시간을 줄일 수 있습니다.

<div class="alert is-helpful">

For the final sample app with two lazy-loaded modules that this page describes, see the
<live-example></live-example>.

</div>


{@a lazy-loading}

## Lazy loading basics

This section introduces the basic procedure for configuring a lazy-loaded route.
For a step-by-step example, see the [step-by-step setup](#step-by-step) section on this page.

To lazy load Angular modules, use `loadchildren` (instead of `component`) in your `AppRoutingModule` `routes` configuration as follows.

<code-example header="AppRoutingModule (excerpt)">

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule)
  }
];

</code-example>

In the lazy-loaded module's routing module, add a route for the component.

<code-example header="Routing module for lazy loaded module (excerpt)">

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent
  }
];

</code-example>

Also be sure to remove the `ItemsModule` from the `AppModule`.
For step-by-step instructions on lazy loading modules, continue with the following sections of this page.

{@a step-by-step}

## Step-by-step setup

<!--
There are two main steps to setting up a lazy-loaded feature module:

1. Create the feature module with the CLI, using the `--route` flag.
1. Configure the routes.
-->
기능 모듈을 지연 로딩 하는 것은 세 단계로 진행합니다.

1. Angular CLI로 모듈을 생성하면서 `--route` 플래그를 붙여줍니다.
1. 라우팅 규칙을 설정합니다.


<!--
### Set up an app
-->
### 앱 생성하기

<!--
If you don’t already have an app, you can follow the steps below to
create one with the CLI. If you already have an app, skip to
[Configure the routes](#config-routes). Enter the following command
where `customer-app` is the name of your app:

<code-example language="bash">
ng new customer-app --routing
</code-example>

This creates an app called `customer-app` and the `--routing` flag
generates a file called `app-routing.module.ts`, which is one of
the files you need for setting up lazy loading for your feature module.
Navigate into the project by issuing the command `cd customer-app`.

<div class="alert is-helpful">

The `--routing` option requires Angular/CLI version 8.1 or higher.
See [Keeping Up to Date](guide/updating).

</div>
-->
아직 프로젝트를 만들지 않았다면 Angular CLI를 사용해서 새로운 애플리케이션을 생성합니다. 이미 있는 앱을 활용하려면 [라우터 설정하기](#config-routes) 부분으로 넘어가세요.
애플리케이션은 다음 명령을 실행해서 생성합니다:

<code-example language="bash">
ng new customer-app --routing
</code-example>

이 명령을 실행하면 `customer-app` 이라는 이름으로 애플리케이션이 생성되는데, 이 때 옵션으로 `--routing` 플래그를 설정했기 때문에 `app-routing.module.ts` 파일이 함께 생성됩니다. 이 파일은 기능 모듈을 지연 로딩하도록 설정할 때 사용합니다.
애플리케이션이 생성되고 나면 `cd customer-app` 명령을 실행해서 프로젝트 폴더로 이동합니다.

<div class="alert is-helpful">

Angular/CLI 8.1 이상 버전에서는 `--routing` 옵션이 꼭 필요합니다.
[최신버전 유지하기](guide/updating) 문서를 참고하세요.

</div>


<!--
### Create a feature module with routing
-->
### 기능 모듈 생성하면서 라우팅 설정하기

<!--
Next, you’ll need a feature module with a component to route to.
To make one, enter the following command in the terminal, where `customers` is the name of the feature module. The path for loading the `customers` feature modules is also `customers` because it is specified with the `--route` option:

<code-example language="bash">
ng generate module customers --route customers --module app.module
</code-example>

This creates a `customers` folder with the new lazy-loadable module `CustomersModule` defined in the `customers.module.ts` file. The command automatically declares the `CustomersComponent` inside the new feature module.

Because the new module is meant to be lazy-loaded, the command does NOT add a reference to the new feature module in the application's root module file, `app.module.ts`.
Instead, it adds the declared route, `customers` to the `routes` array declared in the module provided as the `--module` option.

<code-example
  header="src/app/app-routing.module.ts"
  path="lazy-loading-ngmodules/src/app/app-routing.module.ts"
  region="routes-customers">
</code-example>

Notice that the lazy-loading syntax uses `loadChildren` followed by a function that uses the browser's built-in `import('...')` syntax for dynamic imports.
The import path is the relative path to the module.
-->
그 다음에는 컴포넌트로 라우팅할 기능 모듈을 생성해야 합니다.
터미널에서 다음 명령을 실행해서 `customers` 기능 모듈을 생성합니다.
이 때 `--routing` 옵션을 함께 사용했기 때문에 이 모듈은 `customers` 경로부터 라우팅을 시작합니다:

<code-example language="bash">
ng generate module customers --route customers --module app.module
</code-example>

이 명령을 실행하면 `customers` 폴더에 `customers.module.ts` 파일을 생성하면서 이 파일에 지연 로딩되는 `CustomerModule`을 선언합니다.
그리고 `CustomersComponent`로 라우팅되는 경로도 자동으로 추가합니다.

이 모듈은 지연로딩되도록 생성되었기 때문에 기존에 있던 기능 모듈이나 앱 최상위 모듈 `app.module.ts` 파일을 수정하지는 않습니다.
대신, `--module` 옵션으로 지정한 모듈의 `routes` 배열에 `customers` 라우팅 규칙이 다음과 같이 추가됩니다.

<code-example
  header="src/app/app-routing.module.ts"
  path="lazy-loading-ngmodules/src/app/app-routing.module.ts"
  region="routes-customers">
</code-example>

지연로딩되는 모듈은 동적로딩을 위해 브라우저가 제공하는 `import('...')` 문법의 문자열이 `loadChildren` 프로퍼티에 할당되는 식으로 구현합니다.


<!--
#### Add another feature module
-->
#### 기능 모듈 하나 더 생성하기

<!--
Use the same command to create a second lazy-loaded feature module with routing, along with its stub component.

<code-example language="bash">
ng generate module orders --route orders --module app.module
</code-example>

This creates a new folder called `orders` containing the `OrdersModule` and `OrdersRoutingModule`, along with the new `OrdersComponent` source files.
The `orders` route, specified with the `--route` option, is added to the `routes` array inside the `app-routing.module.ts` file, using the lazy-loading syntax.

<code-example
  header="src/app/app-routing.module.ts"
  path="lazy-loading-ngmodules/src/app/app-routing.module.ts"
  region="routes-customers-orders">
</code-example>
-->
같은 명령을 실행해서 두 번째 지연로딩 기능 모듈을 생성합니다.

<code-example language="bash">
ng generate module orders --route orders --module app.module
</code-example>

이 명령을 실행하면 이전과 마찬가지로 `orders` 폴더에 `OrdersModule`과 `OrdersRoutingModule`이 생성되며 `OrdersComponent`도 함께 생성됩니다.
그리고 이번에도 `--route` 옵션을 사용했기 때문에 `app-routing.module.ts` 파일의 `routes` 배열에는 `orders`로 향하는 라우팅 규칙도 추가됩니다.

<code-example
  header="src/app/app-routing.module.ts"
  path="lazy-loading-ngmodules/src/app/app-routing.module.ts"
  region="routes-customers-orders">
</code-example>


<!--
### Set up the UI
-->
### 화면 구성하기

<!--
Though you can type the URL into the address bar, a navigation UI is easier for the user and more common.
Replace the default placeholder markup in `app.component.html` with a custom nav
so you can easily navigate to your modules in the browser:

<code-example path="lazy-loading-ngmodules/src/app/app.component.html" header="app.component.html" region="app-component-template" header="src/app/app.component.html"></code-example>

To see your app in the browser so far, enter the following command in the terminal window:

<code-example language="bash">
ng serve
</code-example>

Then go to `localhost:4200` where you should see “customer-app” and three buttons.

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/three-buttons.png" width="300" alt="three buttons in the browser">
</div>

These buttons work, because the CLI automatically added the routes to the feature modules to the `routes` array in `app.module.ts`.
-->
이동하려는 URL은 주소표시줄에 직접 입력해도 되지만 네비게이션 UI를 사용하는 방식이 더 편하기 때문에 대부분의 경우에 이런 방식이 사용됩니다.
`app.component.html` 파일을 수정해서 모듈을 전환할 수 있도록 다음과 같이 수정합니다:

<code-example path="lazy-loading-ngmodules/src/app/app.component.html" header="app.component.html" region="app-component-template" header="src/app/app.component.html"></code-example>

그리고 애플리케이션을 브라우저에 실행하기 위해 다음 명령을 실행합니다:

<code-example language="bash">
ng serve
</code-example>

이제 브라우저에서 `localhost:4200`로 접속하면 다음과 같은 화면을 볼 수 있습니다.

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/three-buttons.png" width="300" alt="three buttons in the browser">
</div>

그리고 Angular CLI로 기능모듈을 생성할 때 `app.module.ts` 파일의 `routes` 배열도 수정되었기 때문에 버튼을 클릭하면 해당 모듈로 이동합니다.


{@a config-routes}

<!--
### Imports and route configuration
-->
### 라우팅 규칙 설정하고 로드하기

<!--
The CLI automatically added each feature module to the routes map at the application level.
Finish this off by adding the default route. In the `app-routing.module.ts` file, update the `routes` array with the following:

<code-example path="lazy-loading-ngmodules/src/app/app-routing.module.ts" id="app-routing.module.ts" region="const-routes" header="src/app/app-routing.module.ts"></code-example>

The first two paths are the routes to the `CustomersModule` and the `OrdersModule`.
The final entry defines a default route. The empty path matches everything that doesn't match an earlier path.
-->
Angular CLI로 기능 모듈을 생성하면 애플리케이션 계층에 자동으로 라우팅 규칙을 추가합니다.
`app-routing.module.ts` 파일에 기본 라우팅 규칙을 추가해서 설정을 마무리 합시다:

<code-example path="lazy-loading-ngmodules/src/app/app-routing.module.ts" id="app-routing.module.ts" region="const-routes" header="src/app/app-routing.module.ts"></code-example>

앞에서부터 두 규칙은 `CustomerModule`과 `OrderModule`로 향하는 라우팅 규칙입니다.
그리고 마지막 라우팅 규칙은 빈 경로가 입력되거나 해당되는 라우팅 규칙을 찾지 못했을 때 이동하는 기본 라우팅 규칙입니다.


<!--
### Inside the feature module
-->
### 기능 모듈 안에서 라우팅하기

<!--
Next, take a look at the `customers.module.ts` file. If you’re using the CLI and following the steps outlined in this page, you don’t have to do anything here.

<code-example path="lazy-loading-ngmodules/src/app/customers/customers.module.ts" id="customers.module.ts" region="customers-module" header="src/app/customers/customers.module.ts"></code-example>

The `customers.module.ts` file imports the `customers-routing.module.ts` and `customers.component.ts` files. `CustomersRoutingModule` is listed in the `@NgModule` `imports` array giving `CustomersModule` access to its own routing module. `CustomersComponent` is in the `declarations` array, which means `CustomersComponent` belongs to the `CustomersModule`.


The `app-routing.module.ts` then imports the feature module, `customers.module.ts` using JavaScript's dynamic import.

The feature-specific route definition file `customers-routing.module.ts` imports its own feature component defined in the `customers.component.ts` file, along with the other JavaScript import statements. It then maps the empty path to the `CustomersComponent`.

<code-example path="lazy-loading-ngmodules/src/app/customers/customers-routing.module.ts" id="customers-routing.module.ts" region="customers-routing-module" header="src/app/customers/customers-routing.module.ts"></code-example>

The `path` here is set to an empty string because the path in `AppRoutingModule` is already set to `customers`, so this route in the `CustomersRoutingModule`, is already within the `customers` context. Every route in this routing module is a child route.

The other feature module's routing module is configured similarly.

<code-example path="lazy-loading-ngmodules/src/app/orders/orders-routing.module.ts" id="orders-routing.module.ts" region="orders-routing-module-detail" header="src/app/orders/orders-routing.module.ts (excerpt)"></code-example>
-->
이번에는 `customers.module.ts` 파일을 봅시다.
이 문서에서 설명하는 대로 Angular CLI를 사용해 왔다면 이 코드에서 더 수정할 것은 없습니다.

<code-example path="lazy-loading-ngmodules/src/app/customers/customers.module.ts" id="customers.module.ts" region="customers-module" header="src/app/customers/customers.module.ts"></code-example>

`customers.module.ts` 파일은 `customers-routing.module.ts` 파일과 `customers.component.ts` 파일을 로드합니다.
이 파일에서 불러온 `CustomersRoutingModule`은 `CustomersModule`의 `@NgModule` 데코레이터 `imports` 배열에 추가되어 모듈의 라우팅을 담당하고, `CustomersComponent`는 `declarations` 배열에 추가되어 `CustomersModule`의 진입점이 됩니다.

그리고 나서 `app-routing.module.ts`이 기능 모듈을 로드하게 되면 JavaScript의 동적 로딩을 활용해서 `customers.module.ts` 파일을 읽습니다.

이 때 기능 모듈 안에 있는 `customers-routing.module.ts` 파일이 모듈의 진입점이 되는 `customers.component.ts` 파일도 함께 로드하게 되면서 모듈의 세부 주소가 지정되어있지 않은 초기상태에서는 `CustomerComponent`가 화면에 표시됩니다.

<code-example path="lazy-loading-ngmodules/src/app/customers/customers-routing.module.ts" id="customers-routing.module.ts" region="customers-routing-module" header="src/app/customers/customers-routing.module.ts"></code-example>

이 코드에서 `path`는 빈 문자열로 지정합니다.
왜냐하면 `customers` 라는 주소는 `AppRoutingModule`에서 `CustomersRoutingModule`을 로드할 때 이미 지정했기 때문입니다.
결국 `CustomersRoutingModule`에 있는 모든 라우팅 규칙은 `AppRoutingModule`의 자식 라우팅 규칙이 됩니다.

다른 기능모듈도 비슷하게 설정합니다.

<code-example path="lazy-loading-ngmodules/src/app/orders/orders-routing.module.ts" id="orders-routing.module.ts" region="orders-routing-module-detail" header="src/app/orders/orders-routing.module.ts (일부)"></code-example>


<!--
### Verify lazy loading
-->
### 지연로딩 동작 확인하기

<!--
You can check to see that a module is indeed being lazy loaded with the Chrome developer tools. In Chrome, open the dev tools by pressing `Cmd+Option+i` on a Mac or `Ctrl+Shift+j` on a PC and go to the Network Tab.

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/network-tab.png" width="600" alt="lazy loaded modules diagram">
</div>


Click on the Orders or Customers button. If you see a chunk appear, everything is wired up properly and the feature module is being lazy loaded. A chunk should appear for Orders and for Customers but will only appear once for each.


<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/chunk-arrow.png" width="600" alt="lazy loaded modules diagram">
</div>


To see it again, or to test after working in the project, clear everything out by clicking the circle with a line through it in the upper left of the Network Tab:

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/clear.gif" width="200" alt="lazy loaded modules diagram">
</div>


Then reload with `Cmd+r` or `Ctrl+r`, depending on your platform.
-->
Chrome 개발자 도구를 활용하면 모듈이 정말 지연 로딩되었는지 확인할 수 있습니다.
Chrome 브라우저에서 개발자 도구를 열고 네트워크 탭으로 이동합니다.
Mac에서는 `Cmd+Option+i`, Windows에서는 `Ctrl+Shift+j`를 누르면 됩니다.

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/network-tab.png" width="600" alt="lazy loaded modules diagram">
</div>


그리고 이제 Orders나 Customers 버튼을 클릭해 봅시다.
그러면 애플리케이션 패키지 파일과 별개의 청크(chunk) 파일로 패키징된 지연 로딩 모듈이 로드되는 것을 확인할 수 있습니다.
이 파일은 `OrdersModule`이나 `CustomersModule`에 접근할 때 한 번씩만 로드됩니다.


<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/chunk-arrow.png" width="600" alt="lazy loaded modules diagram">
</div>


이 과정을 다시 확인하려면 브라우저에 애플리케이션을 다시 실행해야 합니다. 먼저, 네트워크 탭에서 Clear 버튼을 눌러서 네트워크 기록을 초기화합니다:

<div class="lightbox">
  <img src="generated/images/guide/lazy-loading-ngmodules/clear.gif" width="200" alt="lazy loaded modules diagram">
</div>


그리고 페이지를 새로고침하면 애플리케이션이 다시 실행될 것입니다.


<!--
## `forRoot()` and `forChild()`
-->
## `forRoot()`와 `forChild()`

<!--
You might have noticed that the CLI adds `RouterModule.forRoot(routes)` to the `AppRoutingModule` `imports` array.
This lets Angular know that the `AppRoutingModule` is a routing module and `forRoot()` specifies that this is the root routing module.
It configures all the routes you pass to it, gives you access to the router directives, and registers the `Router` service.
Use `forRoot()` only once in the application, inside the `AppRoutingModule`.

The CLI also adds `RouterModule.forChild(routes)` to feature routing modules.
This way, Angular knows that the route list is only responsible for providing additional routes and is intended for feature modules.
You can use `forChild()` in multiple modules.

The `forRoot()` method takes care of the *global* injector configuration for the Router.
The `forChild()` method has no injector configuration. It uses directives such as `RouterOutlet` and `RouterLink`.
For more information, see the [`forRoot()` pattern](guide/singleton-services#forRoot) section of the [Singleton Services](guide/singleton-services) guide.
-->
Angular CLI로 생성한 `app-routing.module.ts` 파일을 보면, `imports` 배열에 라우팅 모듈을 등록할 때 `RouterModule.forRoot(routes)`로 지정한 것을 확인할 수 있습니다.
`forRoot()` 메소드를 사용하면 이 라우팅 모듈이 최상위 라우팅 모듈이라는 것을 의미합니다.
그러면 이 애플리케이션에서 라우팅할 때는 모두 이 라우팅 모듈을 거치게 될 것이며, 이 라우팅 모듈의 설정이 모든 라우팅에 적용됩니다.
그래서 `forRoot()`는 애플리케이션의 최상위 계층에서 한 번만 사용해야 합니다.

`RouterModule.forChild(routes)` 패턴은 기능모듈의 라우팅 모듈에서 사용합니다.
라우팅 모듈이 이렇게 등록되면 이 라우팅 규칙은 해당 기능모듈 안에서만 유효합니다.
그래서 `forChild()`는 여러 모듈에서 사용할 수도 있습니다.

조금 자세하게 살펴보면, `forRoot()` 메소드는 라우터가 동작하는 환경을 설정하는 *전역* 인젝터를 관리합니다.
그리고 `forChild()` 메소드는 인젝터를 설정하지 않습니다.
이 메소드는 단순하게 `RouterOutlet`이나 `RouterLink` 같은 디렉티브만 제공합니다.
더 자세한 내용은 [싱글턴 서비스](guide/singleton-services) 가이드 문서의 [`forRoot()` 패턴](guide/singleton-services#forRoot) 섹션을 참고하세요.


{@a preloading}

## Preloading

Preloading improves UX by loading parts of your app in the background.
You can preload modules or component data.

### Preloading modules

Preloading modules improves UX by loading parts of your app in the background so users don't have to wait for the elements to download when they activate a route.

To enable preloading of all lazy loaded modules, import the `PreloadAllModules` token from the Angular `router`.

<code-example header="AppRoutingModule (excerpt)">

import { PreloadAllModules } from '@angular/router';

</code-example>

Still in the `AppRoutingModule`, specify your preloading strategy in `forRoot()`.

<code-example header="AppRoutingModule (excerpt)">

RouterModule.forRoot(
  appRoutes,
  {
    preloadingStrategy: PreloadAllModules
  }
)

</code-example>

### Preloading component data

To preload component data, you can use a `resolver`.
Resolvers improve UX by blocking the page load until all necessary data is available to fully display the page.

#### Resolvers

Create a resolver service.
With the CLI, the command to generate a service is as follows:


<code-example language="none" class="code-shell">
  ng generate service <service-name>
</code-example>

In your service, import the following router members, implement `Resolve`, and inject the `Router` service:

<code-example header="Resolver service (excerpt)">

import { Resolve } from '@angular/router';

...

export class CrisisDetailResolverService implements Resolve<> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<> {
    // your logic goes here
  }
}

</code-example>

Import this resolver into your module's routing module.

<code-example header="Feature module's routing module (excerpt)">

import { YourResolverService }    from './your-resolver.service';

</code-example>

Add a `resolve` object to the component's `route` configuration.

<code-example header="Feature module's routing module (excerpt)">
{
  path: '/your-path',
  component: YourComponent,
  resolve: {
    crisis: YourResolverService
  }
}
</code-example>


In the component, use an `Observable` to get the data from the `ActivatedRoute`.


<code-example header="Component (excerpt)">
ngOnInit() {
  this.route.data
    .subscribe((your-parameters) => {
      // your data-specific code goes here
    });
}
</code-example>

For more information with a working example, see the [routing tutorial section on preloading](guide/router-tutorial-toh#preloading-background-loading-of-feature-areas).


<hr>

<!--
## More on NgModules and routing
-->
## NgModule과 라우팅 더 알아보기

<!--
You may also be interested in the following:
* [Routing and Navigation](guide/router).
* [Providers](guide/providers).
* [Types of Feature Modules](guide/module-types).
* [Route-level code-splitting in Angular](https://web.dev/route-level-code-splitting-in-angular/)
* [Route preloading strategies in Angular](https://web.dev/route-preloading-in-angular/)
-->
다음 내용에 대해서도 더 확인해 보세요:
* [라우팅, 네비게이션](guide/router)
* [프로바이더](guide/providers)
* [기능 모듈의 종류](guide/module-types)
* [라우팅 단위로 코드 나누기](https://web.dev/route-level-code-splitting-in-angular/)
* [라우팅 규칙 사전로딩 정책](https://web.dev/route-preloading-in-angular/)
