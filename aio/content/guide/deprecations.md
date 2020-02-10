<<<<<<< HEAD
<!--
# Deprecated APIs and Features
-->
# 지원이 중단된 기능
=======
# Deprecated APIs and features
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

<!--
Angular strives to balance innovation and stability.
Sometimes, APIs and features become obsolete and need to be removed or replaced so that Angular can stay current with new best practices, changing dependencies, or changes in the (web) platform itself.

To make these transitions as easy as possible, we deprecate APIs and features for a period of time before removing them. This gives you time to update your apps to the latest APIs and best practices.

This guide contains a summary of all Angular APIs and features that are currently deprecated.
-->
Angular는 혁신과 안정성 사이에서 균형을 추구합니다.
그래서 특정 API나 기능이 더이상 필요없다면 이 기능을 제거하거나 다른 기능으로 대체하면서 누구나 Angular를 최선의 방식으로 활용할 수 있도록 관리하고 있습니다. 가끔은 의존성 패키지가 변경되거나 플랫폼과 관련된 기능이 변경되기도 합니다.

이런 변화를 자연스럽게 도입할 수 있도록 지원이 중단되는 기능이나 API는 Angular에서 바로 제거되지 않고 약간 시간 여유를 둔 후에 제거됩니다. 지원이 중단되는 것으로 결정된 기능이 있다면 이 기간을 이용해서 더 나은 방식으로 변경하는 것이 좋습니다.

이 문서는 Angular가 제공하던 기능이나 API 중에서 지금은 지원이 중단된 기능에 대해 안내합니다.

<div class="alert is-helpful">

<!--
Features and APIs that were deprecated in v6 or earlier are candidates for removal in version 9 or any later major version. For information about Angular's deprecation and removal practices, see [Angular Release Practices](guide/releases#deprecation-practices "Angular Release Practices: Deprecation practices").

For step-by-step instructions on how to update to the latest Angular release, use the interactive update guide at [update.angular.io](https://update.angular.io).
-->
Angular 6 버전까지 지원이 중단되기로 계획되었던 기능들은 Angular 9 버전부터 완전히 제거됩니다. 자세한 내용은 [Angular의 릴리즈 정책](guide/releases#deprecation-practices "Angular의 릴리즈 정책: 지원이 중단되는 기능") 문서를 참고하세요.

그리고 지원이 중단되는 기능을 단계별로 수정하는 방법에 대해 알아보려면 [update.angular.io](https://update.angular.io) 가이드를 참고하세요.

</div>

<!--
## Index
-->
## 목차

<!--
To help you future-proof your apps, the following table lists all deprecated APIs and features, organized by the release in which they are candidates for removal. Each item is linked to the section later in this guide that describes the deprecation reason and replacement options.
-->
이 문서에서 설명하는 기능이나 API는 모두 지원이 중단됩니다. 각각의 링크를 클릭해서 해당 기능이 왜 없어지는지, 어떻게 변경되는지 확인해 보세요.

<!--
deprecation -> removal cheat sheet
v4 - v7
v5 - v8
v6 - v9
v7 - v10
v8 - v11
v9 - v12
-->

<<<<<<< HEAD
<!--
| Area | API or Feature | May be removed in |
| ---- | -------------- | ----------------- |
| `@angular/common` | [Pipes using Intl API](#i18n-pipes) | &lt;!--v8--&gt; v9 |
| `@angular/common` | [`ReflectiveInjector`](#reflectiveinjector) | &lt;!--v8--&gt; v9 |
| `@angular/core` | [`CollectionChangeRecord`](#core) | &lt;!--v7--&gt; v9 |
| `@angular/core` | [`DefaultIterableDiffer`](#core) | &lt;!--v7--&gt; v9 |
| `@angular/core` | [`ReflectiveKey`](#core) | &lt;!--v8--&gt; v9 |
| `@angular/core` | [`RenderComponentType`](#core) | &lt;!--v7--&gt; v9 |
| `@angular/core` | [`Renderer`](#core) | &lt;!--v7--&gt; v9 |
| `@angular/core` | [`RootRenderer`](#core) | &lt;!--v7--&gt; v9 |
| `@angular/core` | [`ViewEncapsulation.Native`](#core) | v9 |
| `@angular/forms` | [`ngForm` element selector](#ngform) | v9 |
| `@angular/forms` | [`NgFormSelectorWarning`](#forms) | v9 |
| `@angular/forms` | [`ngModel` with reactive forms](#ngmodel-reactive) | v9 |
| `@angular/router` | [`preserveQueryParams`](#router) | &lt;!--v7--&gt; v9 |
| `@angular/upgrade` | [`@angular/upgrade`](#upgrade) | &lt;!--v8--&gt; v9 |
| `@angular/upgrade` | [`getAngularLib`](#upgrade-static) | &lt;!--v8--&gt; v9 |
| `@angular/upgrade` | [`setAngularLib`](#upgrade-static) | &lt;!--v8--&gt; v9 |
| template syntax | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector) | &lt;!--v7--&gt; unspecified |
| template syntax | [`<template`>](#template-tag) | &lt;!--v7--&gt; v9 |
| service worker | [`versionedFiles` setting](#sw-versionedfiles)| v9 |
| polyfills | [reflect-metadata](#reflect-metadata) | &lt;!--v8--&gt; v9 |
| `@angular/core` | [`defineInjectable`](#core) | v11 |
| `@angular/router` | [`loadChildren` string syntax](#loadChildren) | v11 |
| `@angular/router` | [`ActivatedRoute` params and `queryParams` properties](#activatedroute-props) | unspecified |
-->

| 용도 | 중단되는 기능 | 반영되는 버전 |
| ---- | -------------- | ----------------- |
| `@angular/common` | [다국어 API를 사용하는 파이프](#i18n-pipes) | <!--v8--> v9 |
| `@angular/common` | [`ReflectiveInjector`](#reflectiveinjector) | <!--v8--> v9 |
| `@angular/core` | [`CollectionChangeRecord`](#core) | <!--v7--> v9 |
| `@angular/core` | [`DefaultIterableDiffer`](#core) | <!--v7--> v9 |
| `@angular/core` | [`ReflectiveKey`](#core) | <!--v8--> v9 |
| `@angular/core` | [`RenderComponentType`](#core) | <!--v7--> v9 |
| `@angular/core` | [`Renderer`](#core) | <!--v7--> v9 |
| `@angular/core` | [`RootRenderer`](#core) | <!--v7--> v9 |
| `@angular/core` | [`ViewEncapsulation.Native`](#core) | v9 |
| `@angular/forms` | [`ngForm` 엘리먼트 셀렉터](#ngform) | v9 |
| `@angular/forms` | [`NgFormSelectorWarning`](#forms) | v9 |
| `@angular/forms` | [반응형 폼에 사용하는 `ngModel`](#ngmodel-reactive) | v9 |
| `@angular/router` | [`preserveQueryParams`](#router) | <!--v7--> v9 |
| `@angular/upgrade` | [`@angular/upgrade`](#upgrade) | <!--v8--> v9 |
| `@angular/upgrade` | [`getAngularLib`](#upgrade-static) | <!--v8--> v9 |
| `@angular/upgrade` | [`setAngularLib`](#upgrade-static) | <!--v8--> v9 |
| 템플릿 문법 | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector) | <!--v7--> 확정되지 않음 |
| 템플릿 문법 | [`<template`>](#template-tag) | <!--v7--> v9 |
| 서비스 워커 | [`versionedFiles` 옵션](#sw-versionedfiles)| v9 |
| 폴리필 | [reflect-metadata](#reflect-metadata) | <!--v8--> v9 |
| `@angular/core` | [`defineInjectable`](#core) | v11 |
| `@angular/router` | [`loadChildren` 라우팅 규칙](#loadChildren) | v11 |
| `@angular/router` | [`ActivatedRoute` params와 `queryParams` 프로퍼티](#activatedroute-props) | 확정되지 않음 |
=======

| Area                          | API or Feature                                                                | May be removed in |
| ----------------------------- | ---------------------------------------------------------------------------   | ----------------- |
| `@angular/common`             | [`ReflectiveInjector`](#reflectiveinjector)                                   | <!--v8--> v10 |
| `@angular/common`             | [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | <!--v9--> v11 |
| `@angular/core`               | [`CollectionChangeRecord`](#core)                                             | <!--v7--> v10 |
| `@angular/core`               | [`DefaultIterableDiffer`](#core)                                              | <!--v7--> v10 |
| `@angular/core`               | [`ReflectiveKey`](#core)                                                      | <!--v8--> v10 |
| `@angular/core`               | [`RenderComponentType`](#core)                                                | <!--v7--> v10 |
| `@angular/core`               | [`ViewEncapsulation.Native`](#core)                                           | <!--v6--> v10 |
| `@angular/core`               | [`ModuleWithProviders` without a generic](#moduleWithProviders)               | <!--v9--> v10 |
| `@angular/core`               | [Undecorated base classes that use Angular features](#undecorated-base-classes) | <!--v9--> v10 |
| `@angular/forms`              | [`ngModel` with reactive forms](#ngmodel-reactive)                            | <!--v6--> v10 |
| `@angular/router`             | [`preserveQueryParams`](#router)                                              | <!--v7--> v10 |
| `@angular/upgrade`            | [`@angular/upgrade`](#upgrade)                                                | <!--v8--> v10 |
| `@angular/upgrade`            | [`getAngularLib`](#upgrade-static)                                            | <!--v8--> v10 |
| `@angular/upgrade`            | [`setAngularLib`](#upgrade-static)                                            | <!--v8--> v10 |
| `@angular/platform-webworker` | [All entry points](api/platform-webworker)                                    | <!--v8--> v10 |
| template syntax               | [`<template`>](#template-tag)                                                 | <!--v7--> v10 |
| polyfills                     | [reflect-metadata](#reflect-metadata)                                         | <!--v8--> v10 |
| npm package format            | [`esm5` and `fesm5` entry-points in @angular/* npm packages](guide/deprecations#esm5-fesm5) | <!-- v9 --> v10 |
| `@angular/core`               | [`defineInjectable`](#core)                                                   | <!--v8--> v11 |
| `@angular/core`               | [`entryComponents`](api/core/NgModule#entryComponents)                        | <!--v9--> v11 |
| `@angular/core`               | [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS)       | <!--v9--> v11 |
| `@angular/router`             | [`loadChildren` string syntax](#loadChildren)                                 | <!--v9--> v11 |
| `@angular/core/testing`       | [`TestBed.get`](#testing)                                                     | <!--v9--> v12 |
| `@angular/router`             | [`ActivatedRoute` params and `queryParams` properties](#activatedroute-props) | unspecified |
| template syntax               | [`/deep/`, `>>>`, and `::ng-deep`](#deep-component-style-selector)            | <!--v7--> unspecified |

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072



{@a deprecated-apis}
<!--
## Deprecated APIs
-->
## 지원이 중단된 API

<!--
This section contains a complete list all of the currently-deprecated APIs, with details to help you plan your migration to a replacement.
-->
이 섹션에서는 지금까지 지원이 중단된 API에 대해 소개하고, 이 API를 사용하고 있다면 어떻게 수정하면 되는지 안내합니다.


<div class="alert is-helpful">

<!--
Tip: In the [API reference section](api) of this doc site, deprecated APIs are indicated by ~~strikethrough.~~ You can filter the API list by [**Status: deprecated**](api?status=deprecated).
-->
팁: [API 스펙](api) 문서에서 지원이 중단된 API는 ~~취소선~~으로 표시됩니다. 그리고 해당 문서에서 지원이 중단된 기능만 보려면 [**Status: deprecated**](api?status=deprecated)를 선택하면 됩니다.

</div>

{@a common}
### @angular/common

<<<<<<< HEAD

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) | [`CommonModule`](api/common/CommonModule#pipes) | v5 | See [Pipes](#i18n-pipes) |
 | [`DeprecatedCurrencyPipe`](api/common/DeprecatedCurrencyPipe) | [`CurrencyPipe`](api/common/CurrencyPipe) | v5  | See [Pipes](#i18n-pipes) |
 | [`DeprecatedDatePipe`](api/common/DeprecatedDatePipe) | [`DatePipe`](api/common/DatePipe) | v5  | See [Pipes](#i18n-pipes) |
 | [`DeprecatedDecimalPipe`](api/common/DeprecatedDecimalPipe) | [`DecimalPipe`](api/common/DecimalPipe) | v5  | See [Pipes](#i18n-pipes) |
 | [`DeprecatedPercentPipe`](api/common/DeprecatedPercentPipe) | [`PercentPipe`](api/common/PercentPipe) | v5 | See [Pipes](#i18n-pipes) |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) | [`CommonModule`](api/common/CommonModule#pipes) | v5 | [Pipes](#i18n-pipes) 참고 |
 | [`DeprecatedCurrencyPipe`](api/common/DeprecatedCurrencyPipe) | [`CurrencyPipe`](api/common/CurrencyPipe) | v5  | [Pipes](#i18n-pipes) 참고 |
 | [`DeprecatedDatePipe`](api/common/DeprecatedDatePipe) | [`DatePipe`](api/common/DatePipe) | v5  | [Pipes](#i18n-pipes) 참고 |
 | [`DeprecatedDecimalPipe`](api/common/DeprecatedDecimalPipe) | [`DecimalPipe`](api/common/DecimalPipe) | v5  | [Pipes](#i18n-pipes) 참고 |
 | [`DeprecatedPercentPipe`](api/common/DeprecatedPercentPipe) | [`PercentPipe`](api/common/PercentPipe) | v5 | [Pipes](#i18n-pipes) 참고 |
=======
| API                                                                                           | Replacement                                         | Deprecation announced | Notes |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------- | ----- |
| [`CurrencyPipe` - `DEFAULT_CURRENCY_CODE`](api/common/CurrencyPipe#currency-code-deprecation) | `{provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'}` | v9                    | From v11 the default code will be extracted from the locale data given by `LOCAL_ID`, rather than `USD`. |

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

{@a core}
### @angular/core

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord) | [`IterableChangeRecord`](api/core/IterableChangeRecord) | v4 | none |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | n/a | v4 | Not part of public API. |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | [`Injector.create`](api/core/Injector#create)  | v5 | See [`ReflectiveInjector`](#reflectiveinjector) |
| [`ReflectiveKey`](api/core/ReflectiveKey) | none | v5 | none |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom) | v6 | Use the native encapsulation mechanism of the renderer. See [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32).
<<<<<<< HEAD
| [`WtfScopeFn`](api/core/WtfScopeFn) | none | v8 | See [Web Tracing Framework](#wtf) |
| [`wtfCreateScope`](api/core/wtfCreateScope) | none | v8 | See [Web Tracing Framework](#wtf) |
| [`wtfStartTimeRange`](api/core/wtfStartTimeRange) | none | v8 | See [Web Tracing Framework](#wtf) |
| [`wtfEndTimeRange`](api/core/wtfEndTimeRange) | none | v8 | See [Web Tracing Framework](#wtf) |
| [`wtfLeave`](api/core/wtfLeave) | none | v8 | See [Web Tracing Framework](#wtf) |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`CollectionChangeRecord`](api/core/CollectionChangeRecord) | [`IterableChangeRecord`](api/core/IterableChangeRecord) | v4 | 없음 |
| [`DefaultIterableDiffer`](api/core/DefaultIterableDiffer) | 해당 없음 | v4 | 퍼블릭 API는 아님 |
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | 빌드해서 생성된 코드에만 사용되기 때문에 이 API를 직접 사용하는 코드는 없음 |
| [`ReflectiveInjector`](api/core/ReflectiveInjector) | [`Injector.create`](api/core/Injector#create)  | v5 | [`ReflectiveInjector`](#reflectiveinjector) 참고 |
| [`ReflectiveKey`](api/core/ReflectiveKey) | 없음 | v5 | 없음 |
| [`RenderComponentType`](api/core/RenderComponentType) | [`RendererType2`](api/core/RendererType2), [`Renderer2`](api/core/Renderer2) | v4 | 없음 |
| [`Renderer`](api/core/Renderer) | [`Renderer2`](api/core/Renderer2) | v4 | 없음 |
| [`RootRenderer`](api/core/RootRenderer) | [`RendererFactory2`](api/core/RendererFactory2) | v4 | 없음 |
| [`ViewEncapsulation.Native`](api/core/ViewEncapsulation#Native) | [`ViewEncapsulation.ShadowDom`](api/core/ViewEncapsulation#ShadowDom) | v6 | 렌더러의 기본 캡슐화 정책을 사용하세요. [view.ts](https://github.com/angular/angular/blob/3e992e18ebf51d6036818f26c3d77b52d3ec48eb/packages/core/src/metadata/view.ts#L32) 참고 |
| [`WtfScopeFn`](api/core/WtfScopeFn) | 없음 | v8 | [Web Tracing Framework](#wtf) 참고 |
| [`wtfCreateScope`](api/core/wtfCreateScope) | 없음 | v8 | [Web Tracing Framework](#wtf) 참고 |
| [`wtfStartTimeRange`](api/core/wtfStartTimeRange) | 없음 | v8 | [Web Tracing Framework](#wtf) 참고 |
| [`wtfEndTimeRange`](api/core/wtfEndTimeRange) | 없음 | v8 | [Web Tracing Framework](#wtf) 참고 |
| [`wtfLeave`](api/core/wtfLeave) | 없음 | v8 | [Web Tracing Framework](#wtf) 참고 |
=======
| [`defineInjectable`](api/core/defineInjectable) | `ɵɵdefineInjectable` | v8 | Used only in generated code. No source code should depend on this API. |
| [`entryComponents`](api/core/NgModule#entryComponents) | none | v9 | See [`entryComponents`](#entryComponents) |
| [`ANALYZE_FOR_ENTRY_COMPONENTS`](api/core/ANALYZE_FOR_ENTRY_COMPONENTS) | none | v9 | See [`ANALYZE_FOR_ENTRY_COMPONENTS`](#entryComponents) |
| `ModuleWithProviders` without a generic |  `ModuleWithProviders` with a generic             | v9 | See [`ModuleWithProviders` section](#moduleWithProviders) |
| Undecorated base classes that use Angular features | Base classes with `@Directive()` decorator that use Angular features | v9 | See [undecorated base classes section](#undecorated-base-classes) |






{@a testing}
### @angular/core/testing

| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`TestBed.get`](api/core/testing/TestBed#get) | [`TestBed.inject`](api/core/testing/TestBed#inject) | v9 | Same behavior, but type safe. |

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

{@a forms}
### @angular/forms

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
<<<<<<< HEAD
| [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) | n/a | v6 | See [ngForm](#ngform). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) | 해당 없음 | v6 | [ngForm](#ngform) 참고 |
=======
| [`ngModel` with reactive forms](#ngmodel-reactive) | See [FormControlDirective usage notes](api/forms/FormControlDirective#use-with-ngmodel) | v6 | none |
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

{@a router}
### @angular/router

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4 | none |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`preserveQueryParams`](api/router/NavigationExtras#preserveQueryParams) | [`queryParamsHandling`](api/router/NavigationExtras#queryParamsHandling) | v4 | 없음 |

{@a platform-webworker}
### @angular/platform-webworker

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/platform-webworker) | none | v8 | See [platform-webworker](#webworker-apps). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [모든 API](api/platform-webworker) | 없음 | v8 | [platform-webworker](#webworker-apps) 참고 |

{@a platform-webworker-dynamic}
### @angular/platform-webworker-dynamic

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/platform-webworker-dynamic) | none | v8 | See [platform-webworker](#webworker-apps). |
-->
| API | 대체 긱능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [모든 API](api/platform-webworker-dynamic) | 없음 | v8 | [platform-webworker](#webworker-apps) 참고 |

{@a upgrade}
### @angular/upgrade

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [All entry points](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [모든 API](api/upgrade) | [`@angular/upgrade/static`](api/upgrade/static) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |

{@a upgrade-static}
### @angular/upgrade/static

<!--
| API | Replacement | Deprecation announced | Notes |
| --- | ----------- | --------------------- | ----- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
[`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | See [Upgrading from AngularJS](guide/upgrade). |
-->
| API | 대체 기능 | 지원 중단 발표 | 참고 |
| --- | ----------- | --------------------- | ----- |
| [`getAngularLib`](api/upgrade/static/getAngularLib) | [`getAngularJSGlobal`](api/upgrade/static/getAngularJSGlobal) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |
[`setAngularLib`](api/upgrade/static/setAngularLib) | [`setAngularJSGlobal`](api/upgrade/static/setAngularJSGlobal) | v5 | [AngularJS 앱 업그레이드하기](guide/upgrade) 참고 |

{@a deprecated-features}
<!--
## Deprecated features
-->
## 지원이 중단된 기능

<!--
This section lists all of the currently-deprecated features, which includes template syntax, configuration options, and any other deprecations not listed in the [Deprecated APIs](#deprecated-apis) section above. It also includes deprecated API usage scenarios or API combinations, to augment the information above.
-->
이 섹션에서는 템플릿 문법, 환경설정 옵션 등 [지원이 중단된 API](#deprecated-apis)에 다루지 않았던 지원 중단 기능에 대해 안내합니다. 그리고 이 섹션에서는 좀 더 복잡한 시나리오에 사용하는 API나 여러 API를 조합해서 사용하는 API 중 이제는 지원이 중단된 API에 대해서도 설명합니다.


{@a wtf}
<!--
### Web Tracing Framework integration
-->
### 웹 트레이싱 프레임워크 지원

<<<<<<< HEAD
<!--
Angular previously has supported an integration with the Web Tracing Framework (WTF) for performance testing of Angular applications. This integration has not been maintained and likely does not work for the majority of Angular applications today. As a result, we are deprecating the integration in Angular version 8.
-->
Angular는 이전까지 Angular 애플리케이션의 성능을 측정할 때 사용하기 위해 웹 트레이싱 프레임워크(Web Tracing Framework, WTF)를 지원했습니다. 하지만 이 프레임워크는 더이상 유지보수되지 않아 최신버전의 Angular 애플리케이션에는 동작하지 않기 때문에 Angular 8 버전부터 지원이 중단되었습니다.
=======
Angular previously has supported an integration with the [Web Tracing Framework (WTF)](https://google.github.io/tracing-framework/) for performance testing of Angular applications. This integration has not been maintained and defunct. As a result, the integration was deprecated in Angular version 8 and due to no evidence of any existing usage removed in version 9.

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

{@a deep-component-style-selector}
<!--
### `/deep/`, `>>>` and `:ng-deep` component style selectors
-->
### 컴포넌트 스타일 셀렉터: `/deep/`, `>>>`, `:ng-deep`

<!--
The shadow-dom-piercing descendant combinator is deprecated and support is being [removed from major browsers and tools](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). As such, in v4 we deprecated support in Angular for all 3 of `/deep/`, `>>>` and `::ng-deep`. Until removal, `::ng-deep` is preferred for broader compatibility with the tools.

For more information, see [/deep/, >>>, and ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep")
 in the Component Styles guide.
-->
섀도우 DOM 안쪽으로 자식 엘리먼트를 선택하는 셀렉터는 [최신 브라우저에서 지원하지 않기 때문에 제거되었습니다](https://developers.google.com/web/updates/2017/10/remove-shadow-piercing). 이에 따라 Angular 3 버전에 존재하던 `/deep/`과 `>>>`, `::ng-deep`은 모두 Angular 4버전부터 지원이 중단되는 것으로 계획되었습니다. 다만, 지원이 중단되기 전까지 이 기능이 꼭 필요하다면 이 중에서는 `::ng-deep`을 사용하는 것을 권장합니다.

더 자세한 내용은 컴포넌트 스타일 가이드 문서의 [/deep/, >>>, ::ng-deep](guide/component-styles#deprecated-deep--and-ng-deep "Component Styles guide, Deprecated deep and ngdeep") 섹션을 참고하세요.

{@a template-tag}
<!--
### &lt;template&gt; tag
-->
### &lt;template&gt; 태그

<<<<<<< HEAD
<!--
The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/aot-compiler#enablelegacytemplate) guide.
-->
`<template>` 태그는 웹 컴포넌트에서 사용하는 DOM 엘리먼트와 이름이 중복되었기 때문에 Angular 4버전부터 지원이 중단되었습니다. Angular에서는 이 태그 대신 `<ng-template>`을 사용하면 됩니다. 더 자세한 내용은 [Ahead-of-Time (AOT) 컴파일러](guide/aot-compiler#enablelegacytemplate) 가이드 문서를 참고하세요.


{@a ngform}
<!--
### ngForm element selector
-->
### ngForm 엘리먼트 셀렉터

<!--
Support for using `ngForm` element selector was deprecated in v6.
It has been deprecated to be consistent with other core Angular selectors, which are typically written in kebab-case.

Deprecated:
-->
`ngForm` 엘리먼트 셀렉터는 Angular 6버전부터 지원이 중단되었습니다.
이 셀렉터는 Angular 코어 라이브러리에서 사용하는 셀렉터가 모두 케밥-케이스로 사용하는 것이 일반적이었기 때문에, 통일성을 맞추기 위해 변경되었습니다.

원래 다음과 같이 사용했습니다:

```
<ngForm #myForm="ngForm">
```

<!--
Replacement:
-->
이 코드는 이렇게 변경하면 됩니다:

```
<ng-form #myForm="ngForm">
```

<!--
The [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) directive is solely used to display warnings when the deprecated `ngForm` selector is used.
-->
`ngForm` 셀렉터가 사용되었을 때 경고 메시지를 표시하려면 [`NgFormSelectorWarning`](api/forms/NgFormSelectorWarning) 디렉티브를 사용하는 것도 좋습니다.
=======
The `<template>` tag was deprecated in v4 to avoid colliding with the DOM's element of the same name (such as when using web components). Use `<ng-template>` instead. For more information, see the [Ahead-of-Time Compilation](guide/angular-compiler-options#enablelegacytemplate) guide.

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072


{@a ngmodel-reactive}
<!--
### ngModel with reactive forms
-->
### 반응형 폼에 사용하는 ngModel

<!--
Support for using the `ngModel` input property and `ngModelChange` event with reactive form directives was deprecated in version 6.

For more information, see the usage notes for [`FormControlDirective`](api/forms/FormControlDirective#use-with-ngmodel) and [`FormControlName`](api/forms/FormControlName#use-with-ngmodel).
-->
반응형 폼에서 입력 프로퍼티로 사용하는 `ngModel`과 `ngModelChange` 이벤트는 Angular 6버전부터 더이상 사용하지 않습니다.

자세한 내용은 [`FormControlDirective`](api/forms/FormControlDirective#use-with-ngmodel)와 [`FormControlName`](api/forms/FormControlName#use-with-ngmodel) 문서를 참고하세요.

<<<<<<< HEAD
{@a sw-versionedfiles}
<!--
### Service worker versionedFiles
-->
### 서비스 워커 versionedFiles 옵션

<!--
In the service worker configuration file `ngsw-config.json`, `versionedFiles` and `files` have the same behavior. As of v6, `versionedFiles` is deprecated; use `files` instead.

For more information, see [Service Worker Configuration](guide/service-worker-config#assetgroups).
-->
서비스 워커 환경설정 파일 `ngsw-config.json`에 사용하는 옵션 중 `versionedFiles`와 `files`는 같은 동작을 합니다. 그래서 Angular 6 버전부터는 `files`를 사용하며 `versionedFiles`는 더이상 사용하지 않습니다.

더 자세한 내용은 [서비스 워커 환경설정](guide/service-worker-config#assetgroups) 문서를 참고하세요.

=======
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072
{@a reflectiveinjector}
### ReflectiveInjector

<!--
In v5, Angular replaced the `ReflectiveInjector` with the `StaticInjector`. The injector no longer requires the Reflect polyfill, reducing application size for most developers.

Before:
-->
Angular 5버전부터 `ReflectiveInjector`가 `StaticInjector`로 변경되었습니다. 그 결과로 이제는 더이상 Reflect 폴리필이 사용되지 않기 때문에 Angular 애플리케이션의 빌드 결과물 크기도 더 작아졌습니다.

이전에는 이렇게 사용했습니다:

```
ReflectiveInjector.resolveAndCreate(providers);
```

<!--
After:
-->
이제는 이렇게 사용합니다:

```
Injector.create({providers});
```

<<<<<<< HEAD
{@a i18n-pipes}
<!--
### Pipes using Intl API
-->
### 다국어 API를 사용하는 파이프

<!--
From https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced
-->
<!--
Angular used to rely on the browser to provide number, date, and currency formatting using browser i18n APIs. This practice meant that most apps needed to use a polyfill, users were seeing inconsistent results across browsers, and common formats (such as the currency pipe) didn’t match developer expectations out of the box.

In version 4.3, Angular introduced new number, date, and currency pipes that increase standardization across browsers and eliminate the need for i18n polyfills. These pipes use the Unicode Common Locale Data Repository (CLDR) instead of the JS Intl API to provide extensive locale support.

In version 5.0.0, Angular updated its standard pipes to use the CLRD implementation.
At that time, Angular also added [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule) and related APIs to provide limited-time access to the old behavior. If you need to use these `Deprecated*` pipes, see [Angular change log](https://github.com/angular/angular/blob/master/CHANGELOG.md#i18n-pipes) and the [Date Formats mappings](https://docs.google.com/spreadsheets/d/12iygt-_cakNP1VO7MV9g4lq9NsxVWG4tSfc98HpHb0k/edit#gid=0 "Date Formats Google sheet").

Reminder: If you use these `Deprecated*` pipes, you should migrate to the current APIs listed above as soon as possible. These deprecated APIs are candidates for removal in version 9.
-->
Angular는 숫자나 날짜, 통화 형식을 표현할 때 브라우저가 제공하는 다국어 API를 사용했습니다. 이 말은, 브라우저에 따라 결과가 동일하지 않을 수 있기 때문에 폴리필이 추가로 필요하다는 것을 의미했습니다.

Angular 4.3 버전에는 이를 대비해서 숫자, 날짜, 통화 파이프가 브라우저와 관계없이 동일하게 동작할 수 있도록 새로 추가되었으며, 다국어 폴리필도 제거되었습니다. 새롭게 도입된 파이프는 기존에 사용하던 JS 다국어 API 대신 Unicode Common Locale Data Repository (CLDR)을 활용합니다.

그리고 이 파이프는 Angular 5.0.0 버전부터 표준 파이프로 적용되었으며, 이와 동시에 이전에 사용하던 [`DeprecatedI18NPipesModule`](api/common/DeprecatedI18NPipesModule)가 지원 중단되는 것으로 정해졌습니다. 다만, 이렇게 지원이 중단된 파이프를 꼭 사용해야 한다면 [Angular 체인지 로그](https://github.com/angular/angular/blob/master/CHANGELOG.md#i18n-pipes)와 [Date Formats mappings](https://docs.google.com/spreadsheets/d/12iygt-_cakNP1VO7MV9g4lq9NsxVWG4tSfc98HpHb0k/edit#gid=0 "Date Formats Google sheet") 문서를 확인한 후에 사용하세요.

참고: 지금은 지원이 중단될 예정인 파이프를 사용하더라도 조만간 새로운 방식으로 변경해야 합니다. 이 API들은 Angular 9 버전부터 완전히 제거될 것입니다.

=======
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072
{@a loadChildren}
<!--
### loadChildren string syntax
-->
### loadChildren 문법

<!--
When Angular first introduced lazy routes, there wasn't browser support for dynamically loading additional JavaScript. Angular created our own scheme using the syntax `loadChildren: './lazy/lazy.module#LazyModule'` and built tooling to support it. Now that ECMAScript dynamic import is supported in many browsers, Angular is moving toward this new syntax.

In version 8, the string syntax for the [`loadChildren`](api/router/LoadChildren) route specification was deprecated, in favor of new syntax that uses `import()` syntax.

Before:

```
const routes: Routes = [{
  path: 'lazy',
  // The following string syntax for loadChildren is deprecated
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```
-->
Angular에 지연 라우팅이 처음 등장했을 때는 브라우저가 JavaScript 리소스를 추가로, 동적으로 로딩하는 기능이 없었습니다. 그래서 Angular는 이 기능을 구현하기 위해 독자적으로 `loadChildren: './lazy/lazy.module#LazyModule'`와 같은 문법을 만들어냈습니다. 하지만 이제는 ECMAScript의 동적 로딩 기능을 브라우저 계층에서 지원하는 경우가 많아졌습니다. 그래서 Angular도 이전 방식 대신 새로운 방식을 활용하기로 결정했습니다.

Angular 8 버전부터는 이전까지 사용하던 [`loadChildren`](api/router/LoadChildren) 문법을 사용하지 않고, `import()`를 사용합니다.

이전에는 이렇게 사용했습니다:

```
const routes: Routes = [{
  path: 'lazy',
  // loadChildren에 문자열을 사용해서 지연로딩하는 문법은 이제 사용하지 않습니다.
  loadChildren: './lazy/lazy.module#LazyModule'
}];
```

<!--
After:

```
const routes: Routes = [{
  path: 'lazy',
  // The new import() syntax
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```
-->
이제는 이렇게 사용합니다:

```
const routes: Routes = [{
  path: 'lazy',
  // 이제는 import() 문법을 사용합니다.
  loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)
}];
```


<div class="alert is-helpful">


<!--
**Version 8 update**: When you update to version 8, the [`ng update`](cli/update) command performs the transformation automatically. Prior to version 7, the `import()` syntax only works in JIT mode (with view engine).
-->
**8 버전으로 업데이트하기**: Angular를 8버전으로 올리기 위해 [`ng update`](cli/update) 명령을 실행하면 `loadChildren`으로 지연로딩하던 문법이 자동으로 수정됩니다. 7버전까지는 `import()` 문법이 JIT 모드에서만 동작했습니다.

</div>

<div class="alert is-helpful">

<!--
**Declaration syntax**: It's important to follow the route declaration syntax `loadChildren: () => import('...').then(m => m.ModuleName)` to allow `ngc` to discover the lazy-loaded module and the associated `NgModule`. You can find the complete list of allowed syntax constructs [here](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113). These restrictions will be relaxed with the release of Ivy since it'll no longer use `NgFactories`.
-->
**선언형 문법(declaration syntax)**: `loadChildren` 프로퍼티를 사용해서 모듈을 지연로딩 하려면 `loadChildren: () => import('...').then(m => m.ModuleName)`와 같은 문법을 사용해야 `ngc`가 해당 모듈을 제대로 로드할 수 있습니다. 이 때 사용할 수 있는 문법에 대해서는 [이 문서](https://github.com/angular/angular-cli/blob/a491b09800b493fe01301387fa9a025f7c7d4808/packages/ngtools/webpack/src/transformers/import_factory.ts#L104-L113)를 참고하세요. 문법이 한정되어 있어서 개발자에게는 제약인 것처럼 느낄 수 있지만, 이 방식은 `NgFactories`를 사용하지 않기 때문에 Ivy를 도입하는 측면에서는 더 유리합니다.

</div>



{@a activatedroute-props}
<!--
### ActivatedRoute params and queryParams properties
-->
### ActivatedRoute 객체의 params와 queryParams 프로퍼티

<!--
[ActivatedRoute](api/router/ActivatedRoute) contains two [properties](api/router/ActivatedRoute#properties) that are less capable than their replacements and may be deprecated in a future Angular version.

| Property | Replacement |
| -------- | ----------- |
| `params` | `paramMap` |
| `queryParams` | `queryParamMap` |

For more information see the [Router guide](guide/router#activated-route).
-->
[ActivatedRoute](api/router/ActivatedRoute)에 있던 [프로퍼티](api/router/ActivatedRoute#properties) 중에서 자주 사용되지 않던 프로퍼티가 다른 타입의 프로퍼티로 대체되었습니다.

| 프로퍼티 | 대체 프로퍼티 |
| -------- | ----------- |
| `params` | `paramMap` |
| `queryParams` | `queryParamMap` |

자세한 내용은 [라우터 가이드 문서](guide/router#activated-route)를 참고하세요.


{@a reflect-metadata}
<!--
### Dependency on a reflect-metadata polyfill in JIT mode
-->
### JIT 모드에서 사용하는 reflect-metadata 폴리필

<!--
Angular applications, and specifically applications that relied on the JIT compiler, used to require a polyfill for the [reflect-metadata](https://github.com/rbuckton/reflect-metadata) APIs.

The need for this polyfill was removed in Angular version 8.0 ([see #14473](https://github.com/angular/angular-cli/pull/14473)), rendering the presence of the poylfill in most Angular applications unnecessary. Because the polyfill can be depended on by 3rd-party libraries, instead of removing it from all Angular projects, we are deprecating the requirement for this polyfill as of version 8.0. This should give library authors and application developers sufficient time to evaluate if they need the polyfill, and perform any refactoring necessary to remove the dependency on it.

In a typical Angular project, the polyfill is not used in production builds, so removing it should not impact production applications. The goal behind this removal is overall simplification of the build setup and decrease in the number of external dependencies.
-->
Angular 애플리케이션과 같이 JIT 컴파일러를 사용하는 애플리케이션은 [reflect-metadata](https://github.com/rbuckton/reflect-metadata) API를 사용하기 위해 폴리필이 필요했습니다.

이 폴리필은 Angular 8.0 버전부터 사용하지 않지만([#14473 참고](https://github.com/angular/angular-cli/pull/14473)), 서드파티 패키지에 의존성이 있었기 때문에 제거하지는 않았습니다. 이 버전에서는 단순하게 Angular가 직접 사용하는 reflect-metadata 관련 코드를 제거했을 뿐입니다. 당분간 이 패키지는 그대로 유지되겠지만 애플리케이션 개발자나 서드파티 라이브러리 개발자는 이 폴리필이 정말 필요한지 판단해보고 사용하지 않는 쪽으로 코드를 리팩토링하는 것이 나을 수 있습니다.

Angular 프로젝트를 운영용으로 빌드하더라도 폴리필이 사용되는 경우는 그리 많지 않기 때문에 이 폴리필이 제거되더라도 애플리케이션을 운영하는 데에는 큰 영향이 없습니다. 하지만 빌드 단계를 조금 더 단순하게 줄이고 외부 의존성을 정리하기 위해서는 최종적으로 폴리필을 제거하는 것이 좋습니다.

{@a static-query-resolution}
<!--
### `@ViewChild()` / `@ContentChild()` static resolution as the default
-->
### `@ViewChild()`, `@ContentChild()` 정적 평가

<<<<<<< HEAD
<!--
See our [dedicated migration guide for static queries](guide/static-query-migration).
-->
[정적 쿼리 적용 가이드 문서](guide/static-query-migration)를 참고하세요.
=======
See the [dedicated migration guide for static queries](guide/static-query-migration).
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

{@a contentchild-input-together}
<!--
### `@ContentChild()` / `@Input()` used together
-->
### `@ContentChild()`와 `@Input()`을 함께쓰는 문법

<!--
The following pattern is deprecated:
-->
다음과 같이 사용하던 패턴은 더이상 사용되지 않습니다:

```ts
@Input() @ContentChild(TemplateRef) tpl !: TemplateRef<any>;
```

<!--
Rather than using this pattern, separate the two decorators into their own
properties and add fallback logic as in the following example:
-->
이 방법보다는 두 데코레이터를 따로 나눠서 다음과 같이 구현하는 것이 좋습니다:

```ts
@Input() tpl !: TemplateRef<any>;
@ContentChild(TemplateRef) inlineTemplate !: TemplateRef<any>;
```
{@a cant-assign-template-vars}
<!--
### Cannot assign to template variables
-->
### 템플릿 변수에 값을 직접 할당할 수 없습니다.

<!--
In the following example, the two-way binding means that `optionName`
should be written when the `valueChange` event fires.
-->
아래와 같이 작성된 코드가 있다면, 이 코드는 `valueChange` 이벤트가 발생했을 때 `optionName`의 값이 변경된다는 양방향 바인딩을 의미합니다.

```html
<option *ngFor="let optionName of options" [(value)]="optionName"></option>
```

<!--
However, in practice, Angular simply ignores two-way bindings to template variables. Starting in version 8, attempting to write to template variables is deprecated. In a future version, we will throw to indicate that the write is not supported.
-->
하지만 Angular는 템플릿 변수가 양방향 바인딩으로 연결되되더라도 템플릿 변수에 값을 할당하는 로직은 처리하지 않습니다. 그리고 이제 Angular 8 버전부터는 템플릿 변수에 값을 할당하는 로직 자체를 작성할 수 없습니다. 이 코드는 다음과 같이 작성되어야 하며, 이 코드를 그대로 남겨둔다면 이후 버전에서는 에러가 발생할 수도 있습니다.

```html
<option *ngFor="let optionName of options" [value]="optionName"></option>
```

{@a undecorated-base-classes}
### Undecorated base classes using Angular features

As of version 9, it's deprecated to have an undecorated base class that:

- uses Angular features
- is extended by a directive or component

Angular lifecycle hooks or any of the following Angular field decorators are considered Angular features:

- `@Input()`
- `@Output()`
- `@HostBinding()`
- `@HostListener()`
- `@ViewChild()` / `@ViewChildren()`
- `@ContentChild()` / `@ContentChildren()`

For example, the following case is deprecated because the base class uses `@Input()` and does not have a class-level decorator:

```ts
class Base {
  @Input()
  foo: string;
}

@Directive(...)
class Dir extends Base {
  ngOnChanges(): void {
    // notified when bindings to [foo] are updated
  }
}
```

In a future version of Angular, this code will start to throw an error.
To fix this example, add a selectorless `@Directive()` decorator to the base class:

```ts
@Directive()
class Base {
  @Input()
  foo: string;
}

@Directive(...)
class Dir extends Base {
  ngOnChanges(): void {
    // notified when bindings to [foo] are updated
  }
}
```

In version 9, the CLI has an automated migration that will update your code for you when `ng update` is run.
See [the dedicated migration guide](guide/migration-undecorated-classes) for more information about the change and more examples.



{@a binding-to-innertext}
<!--
### Binding to `innerText` in `platform-server`
-->
### `platform-server`가 자동으로 변환하던 `innerText` 바인딩

<!--
[Domino](https://github.com/fgnass/domino), which is used in server-side rendering, doesn't support `innerText`, so in platform-server's "domino adapter", there was special code to fall back to `textContent` if you tried to bind to `innerText`.

These two properties have subtle differences, so switching to `textContent` under the hood can be surprising to users. For this reason, we are deprecating this behavior. Going forward, users should explicitly bind to `textContent` when using Domino.
-->
서버 사이드 렌더링에 사용되는 [Domino](https://github.com/fgnass/domino)는 `innerText`를 지원하지 않기 때문에 Domino에 사용된 `innerText`를 자동으로 `textContent`로 변환하는 "domino 어댑터"를 platform-server에서 제공했습니다.

그런데 두 프로퍼티의 동작이 약간 다르기 때문에 `innerText`를 사용한 개발자가 혼란스러울 수 있었습니다. 그래서 앞으로는 Domino에 `innerText`를 사용할 수 없고 명확하게 `textContext`만 사용해서 바인딩하도록 변경되었습니다.

{@a wtf-apis}
<!--
### `wtfStartTimeRange` and all `wtf*` APIs
-->
### `wtfStartTimeRange`와 `wtf`로 시작하는 모든 API

<!--
All of the `wtf*` APIs are deprecated and will be removed in a future version.
-->
`wtf`로 시작하는 모든 API는 앞으로 배포될 버전에 모두 지원이 중단됩니다.

{@a webworker-apps}
<<<<<<< HEAD
<!--
### Running Angular applications in platform-webworker 
-->
### Angular 애플리케이션을 platform-webworker로 동작시키기
=======
### Running Angular applications in platform-webworker
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

<!--
The `@angular/platform-*` packages enable Angular to be run in different contexts. For examples,
`@angular/platform-server` enables Angular to be run on the server, and `@angular/platform-browser`
enables Angular to be run in a web browser.

`@angular/platform-webworker` was introduced in Angular version 2 as an experiment in leveraging
Angular's rendering architecture to run an entire web application in a
[web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API). We've learned a lot
from this experiment and have come to the conclusion that running the entire application in a web
worker is not the best strategy for most applications.

Going forward, we will focus our efforts related to web workers around their primary use case of
offloading CPU-intensive, non-critical work needed for initial rendering (such as in-memory search
and image processing). Learn more in the
[guide to Using Web Workers with the Angular CLI](guide/web-worker).

As of Angular version 8, all  `platform-webworker` APIs are deprecated.
This includes both packages: `@angular/platform-webworker` and
`@angular/platform-webworker-dynamic`.
-->
`@angular/platform-*` 패키지는 Angular 애플리케이션을 다양한 환경에서 실행하기 위해 사용합니다. Angular 앱을 서버에서 실행하려면 `@angular/platform-server` 패키지를 사용하며, Angular 앱을 웹 브라우저에서 실행하려면 `@angular/platform-browser` 패키지를 사용하는 식입니다.

`@angular/platform-webworker`는 Angular 애플리케이션을 [웹 워커](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)로 실행할 때 사용하기 위해 Angular 2 버전부터 도입된 패키지입니다. 그런데 이 실험적인 패키지를 운영해오면서 Angular 팀은 Angular 앱을 통째로 웹 워커로 실행하는 것은 최선의 방법이 아니라는 결론을 내렸습니다.

그래서 이제는 웹 워커를 본연의 목적으로만 사용하기로 결정했습니다. 웹 워커는 CPU 부하가 많이 필요한 로직을 분산하는 역할에 충실하도록 개발 방향을 변경했고, 메모리 탐색이나 이미지 처리와 같이 초기 렌더링에 영향을 주지 않는 용도로만 사용하려고 합니다. 자세한 내용은 [Angular로 웹 워커 활용하기](guide/web-worker) 문서를 참고하세요.

그래서 Angular 8 버전부터는 `platform-webworker` API의 지원이 중단됩니다.
`@angular/platform-webworker`, `@angular/platform-webworker-dynamic` 모두 해당됩니다.

<<<<<<< HEAD
{@a removed}
<!--
## Removed APIs
-->
## 지원이 중단된 API

<!--
The following APIs have been removed starting with version 8.0.0:

| Package | API            | Replacement | Notes |
| ------- | -------------- | ----------- | ----- |
| [`@angular/http`](https://v7.angular.io/api/http) | All exports | [`@angular/common/http`](https://v7.angular.io/api/common/http) | See [below](#http). |
[`@angular/http/testing`](https://v7.angular.io/api/http/testing) | All exports | [`@angular/common/http/testing`](https://v7.angular.io/api/common/http/testing) | See [below](#http). |
| `@angular/platform-browser` | [`DOCUMENT`](https://v7.angular.io/api/platform-browser/DOCUMENT) | [`DOCUMENT` in `@angular/common`](https://v7.angular.io/api/common/DOCUMENT) | Updating to version 8 with [`ng update`](cli/update) changes this automatically.  |
| `@angular/core/testing` | [`TestBed.deprecatedOverrideProvider()`](https://v7.angular.io/api/core/testing/TestBed#deprecatedoverrideprovider) | [`TestBed.overrideProvider()`] (api/core/testing/TestBed#overrideprovider) | none |
| `@angular/core/testing` | [`TestBedStatic.deprecatedOverrideProvider()`](https://v7.angular.io/api/core/testing/TestBedStatic#deprecatedoverrideprovider) | [`TestBedStatic.overrideProvider()`](api/core/testing/TestBedStatic#overrideprovider) | none |
-->
다음 API들은 8.0.0 버전부터 완전히 제거되었습니다:

| 패키지 | API            | 대안 | 참고 |
| ------- | -------------- | ----------- | ----- |
| [`@angular/http`](https://v7.angular.io/api/http) | 모든 API | [`@angular/common/http`](https://v7.angular.io/api/common/http) | [아래](#http) 참고 |
[`@angular/http/testing`](https://v7.angular.io/api/http/testing) | 모든 API | [`@angular/common/http/testing`](https://v7.angular.io/api/common/http/testing) | [아래](#http) 참고 |
| `@angular/platform-browser` | [`DOCUMENT`](https://v7.angular.io/api/platform-browser/DOCUMENT) | [`@angular/common`가 제공하던 `DOCUMENT`](https://v7.angular.io/api/common/DOCUMENT) | 8 버전에서 [`ng update`](cli/update) 를 실행하면 자동으로 변경됩니다.  |
| `@angular/core/testing` | [`TestBed.deprecatedOverrideProvider()`](https://v7.angular.io/api/core/testing/TestBed#deprecatedoverrideprovider) | [`TestBed.overrideProvider()`](api/core/testing/TestBed#overrideprovider) | 없음 |
| `@angular/core/testing` | [`TestBedStatic.deprecatedOverrideProvider()`](https://v7.angular.io/api/core/testing/TestBedStatic#deprecatedoverrideprovider) | [`TestBedStatic.overrideProvider()`](api/core/testing/TestBedStatic#overrideprovider) | 없음 |
=======
{@a entryComponents}
### `entryComponents` and `ANALYZE_FOR_ENTRY_COMPONENTS` no longer required
Previously, the `entryComponents` array in the `NgModule` definition was used to tell the compiler which components would be created and inserted dynamically. With Ivy, this isn't a requirement anymore and the `entryComponents` array can be removed from existing module declarations. The same applies to the `ANALYZE_FOR_ENTRY_COMPONENTS` injection token.

{@a moduleWithProviders}
### `ModuleWithProviders` type without a generic

Some Angular libraries, such as `@angular/router` and `@ngrx/store`, implement APIs that return a type called `ModuleWithProviders` (typically via a method named `forRoot()`).
This type represents an `NgModule` along with additional providers.
Angular version 9 deprecates use of `ModuleWithProviders` without an explicitly generic type, where the generic type refers to the type of the `NgModule`.
In a future version of Angular, the generic will no longer be optional.


If you're using the CLI, `ng update` should [migrate your code automatically](guide/migration-module-with-providers).
If you're not using the CLI, you can add any missing generic types to your application manually.
For example:

**Before**
```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config}
      ]
    };
  }
}
```

**After**

```ts
@NgModule({...})
export class MyModule {
  static forRoot(config: SomeConfig): ModuleWithProviders<SomeModule> {
    return {
      ngModule: SomeModule,
      providers: [
        {provide: SomeConfig, useValue: config }
      ]
    };
  }
}
```

{@a esm5-fesm5}
### `esm5` and `fesm5` code formats in @angular/* npm packages

As of Angular v8, the CLI primarily consumes the `fesm2015` variant of the code distributed via `@angular/*` npm packages.
This renders the `esm5` and `fesm5` distributions obsolete and unnecessary, adding bloat to the package size and slowing down npm installations.

The future removal of this distribution will have no impact on CLI users, unless they modified their build configuration to explicitly consume these code distributions.

Any application still relying on the `esm5` and `fesm5` as the input to its build system will need to ensure that the build pipeline is capable of accepting JavaScript code conforming to ECMAScript 2015 (ES2015) language specification.

Note that this change doesn't make existing libraries distributed in this format incompatible with the Angular CLI.
The CLI will fall back and consume libraries in less desirable formats if others are not available.
However, we do recommend that libraries ship their code in ES2015 format in order to make builds faster and build output smaller.

In practical terms, the `package.json` of all `@angular` packages will change in the following way:

**Before**:
```
{
  "name": "@angular/core",
  "version": "9.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm5/core.js",
  "es2015": "./fesm2015/core.js",
  "esm5": "./esm5/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm5": "./fesm5/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

**After**:
```
{
  "name": "@angular/core",
  "version": "10.0.0",
  "main": "./bundles/core.umd.js",
  "module": "./fesm2015/core.js",
  "es2015": "./fesm2015/core.js",
  "esm2015": "./esm2015/core.js",
  "fesm2015": "./fesm2015/core.js",
  ...
}
```

For more information about the npm package format, see the [Angular Package Format spec](https://goo.gl/jB3GVv).



{@a removed}
## Removed APIs

The following APIs have been removed starting with version 9.0.0*:

| Package          | API            | Replacement | Notes |
| ---------------- | -------------- | ----------- | ----- |
| `@angular/core`  | [`Renderer`](https://v8.angular.io/api/core/Renderer) | [`Renderer2`](https://angular.io/api/core/Renderer2) | [Migration guide](guide/migration-renderer) |
| `@angular/core`  | [`RootRenderer`](https://v8.angular.io/api/core/RootRenderer) | [`RendererFactory2`](https://angular.io/api/core/RendererFactory2) | none |
| `@angular/core`  | [`RenderComponentType`](https://v8.angular.io/api/core/RenderComponentType) | [`RendererType2`](https://angular.io/api/core/RendererType2) | none |
| `@angular/core`  | [`WtfScopeFn`](https://v8.angular.io/api/core/WtfScopeFn) | none | v8 | See [Web Tracing Framework](#wtf) |
| `@angular/core`  | [`wtfCreateScope`](https://v8.angular.io/api/core/wtfCreateScope) | none | v8 | See [Web Tracing Framework](#wtf) |
| `@angular/core`  | [`wtfStartTimeRange`](https://v8.angular.io/api/core/wtfStartTimeRange) | none | v8 | See [Web Tracing Framework](#wtf) |
| `@angular/core`  | [`wtfEndTimeRange`](https://v8.angular.io/api/core/wtfEndTimeRange) | none | v8 | See [Web Tracing Framework](#wtf) |
| `@angular/core`  | [`wtfLeave`](https://v8.angular.io/api/core/wtfLeave) | none | v8 | See [Web Tracing Framework](#wtf) |
| `@angular/common` | `DeprecatedI18NPipesModule` | [`CommonModule`](api/common/CommonModule#pipes) | none |
| `@angular/common` | `DeprecatedCurrencyPipe` | [`CurrencyPipe`](api/common/CurrencyPipe) | none |
| `@angular/common` | `DeprecatedDatePipe`     | [`DatePipe`](api/common/DatePipe) | none |
| `@angular/common` | `DeprecatedDecimalPipe` | [`DecimalPipe`](api/common/DecimalPipe) | none |
| `@angular/common` | `DeprecatedPercentPipe` | [`PercentPipe`](api/common/PercentPipe) | none |
| `@angular/forms` | [`NgFormSelectorWarning`](https://v8.angular.io/api/forms/NgFormSelectorWarning) | none | none |
| `@angular/forms` | `ngForm` element selector | `ng-form` element selector | none |
| `@angular/service-worker` | `versionedFiles` | `files` | In the service worker configuration file `ngsw-config.json`, replace `versionedFiles` with `files`. See [Service Worker Configuration](guide/service-worker-config#assetgroups). |

*To see APIs removed in version 8, check out this guide on the [version 8 docs site](https://v8.angular.io/guide/deprecations#removed).

>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072

<!-- The following anchor is used by redirects from the removed API pages. Do not change or remove. -->
{@a http}
### @angular/http

<!--
Deprecation announced in version 5
https://blog.angular.io/version-5-0-0-of-angular-now-available-37e414935ced)
-->

<!--
The entire [`@angular/http`](http://v7.angular.io/api/http) package has been removed. Use [`@angular/common/http`](api/common/http) instead.

The new API is a smaller, easier, and more powerful way to make HTTP requests in Angular.
The new API simplifies the default ergonomics: There is no need to map by invoking the `.json()` method.
It also supports typed return values and interceptors.

To update your apps:
* Replace `HttpModule` with [`HttpClientModule`](api/common/http/HttpClientModule) (from [`@angular/common/http`](api/common/http)) in each of your modules.
* Replace the `Http` service with the [`HttpClient`](api/common/http/HttpClient) service.
* Remove any `map(res => res.json())` calls. They are no longer needed.

For more information about using `@angular/common/http`, see the [HttpClient guide](guide/http "HTTP Client guide").
-->
[`@angular/http`](http://v7.angular.io/api/http) 패키지는 전부 제거되었습니다. 이제는 이 패키지 대신 [`@angular/common/http`](api/common/http) 패키지를 사용해야 합니다.

새로 도입된 API는 좀 더 간단하고, 사용하기 쉽지만, 좀 더 효율적인 방식으로 HTTP 요청을 처리합니다.
게다가 이제 HTTP 응답으로 받은 데이터를 파싱하기 위해 `.json()`을 직접 호출할 필요가 없습니다.
HTTP 응답이나 인터셉터로 받은 반환값의 타입을 지정할 수도 있습니다.

이 패키지를 적용하려면 다음과 같이 수정하면 됩니다:
* 모듈에 로드하던 `HttpModule` 대신 [`@angular/common/http`](api/common/http) 패키지로 제공되는 [`HttpClientModule`](api/common/http/HttpClientModule)를 로드합니다.
* `Http` 대신 [`HttpClient`](api/common/http/HttpClient)를 의존성으로 주입합니다.
* `map(res => res.json())` 코드를 모두 제거합니다. 이 코드는 더이상 필요없습니다.

`@angular/common/http` 패키지를 사용하는 방법은 [HttpClient](guide/http "HttpClient") 문서를 참고하세요.

<!--
| `@angular/http` | Closest replacement in `@angular/common/http` |
| ------------- | ------------------------------------------- |
| `BaseRequestOptions` |  [`HttpRequest`](/api/common/http/HttpRequest) |
| `BaseResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `BrowserXhr` |  |
| `Connection` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `ConnectionBackend` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `CookieXSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |
| `Headers` | [`HttpHeaders`](/api/common/http/HttpHeaders) |
| `Http` | [`HttpClient`](/api/common/http/HttpClient) |
| `HttpModule` | [`HttpClientModule`](/api/common/http/HttpClientModule) |
| `Jsonp` | [`HttpClient`](/api/common/http/HttpClient) |
| `JSONPBackend` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JSONPConnection` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JsonpModule` | [`HttpClientJsonpModule`](/api/common/http/HttpClientJsonpModule) |
| `QueryEncoder` | [`HttpUrlEncodingCodec`](/api/common/http/HttpUrlEncodingCodec) |
| `ReadyState` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `Request` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestMethod` | [`HttpClient`](/api/common/http/HttpClient) |
| `RequestOptions` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestOptionsArgs` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `Response` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseContentType` | [`HttpClient`](/api/common/http/HttpClient) |
| `ResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseOptionsArgs` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseType` | [`HttpClient`](/api/common/http/HttpClient) |
| `URLSearchParams` | [`HttpParams`](/api/common/http/HttpParams) |
| `XHRBackend` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XHRConnection` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |


| `@angular/http/testing` | Closest replacement in `@angular/common/http/testing` |
| --------------------- | ------------------------------------------- |
| `MockBackend` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockConnection` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
<<<<<<< HEAD
-->
| `@angular/http` | `@angular/common/http` 패키지에서 비슷한 역할 |
| ------------- | ------------------------------------------- |
| `BaseRequestOptions` |  [`HttpRequest`](/api/common/http/HttpRequest) |
| `BaseResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `BrowserXhr` |  |
| `Connection` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `ConnectionBackend` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `CookieXSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |
| `Headers` | [`HttpHeaders`](/api/common/http/HttpHeaders) |
| `Http` | [`HttpClient`](/api/common/http/HttpClient) |
| `HttpModule` | [`HttpClientModule`](/api/common/http/HttpClientModule) |
| `Jsonp` | [`HttpClient`](/api/common/http/HttpClient) |
| `JSONPBackend` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JSONPConnection` | [`JsonpClientBackend`](/api/common/http/JsonpClientBackend) |
| `JsonpModule` | [`HttpClientJsonpModule`](/api/common/http/HttpClientJsonpModule) |
| `QueryEncoder` | [`HttpUrlEncodingCodec`](/api/common/http/HttpUrlEncodingCodec) |
| `ReadyState` | [`HttpBackend`](/api/common/http/HttpBackend) |
| `Request` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestMethod` | [`HttpClient`](/api/common/http/HttpClient) |
| `RequestOptions` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `RequestOptionsArgs` | [`HttpRequest`](/api/common/http/HttpRequest) |
| `Response` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseContentType` | [`HttpClient`](/api/common/http/HttpClient) |
| `ResponseOptions` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseOptionsArgs` | [`HttpResponse`](/api/common/http/HttpResponse) |
| `ResponseType` | [`HttpClient`](/api/common/http/HttpClient) |
| `URLSearchParams` | [`HttpParams`](/api/common/http/HttpParams) |
| `XHRBackend` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XHRConnection` | [`HttpXhrBackend`](/api/common/http/HttpXhrBackend) |
| `XSRFStrategy` | [`HttpClientXsrfModule`](/api/common/http/HttpClientXsrfModule) |


| `@angular/http/testing` | `@angular/common/http/testing` 패키지에서 비슷한 역할 |
| --------------------- | ------------------------------------------- |
| `MockBackend` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
| `MockConnection` | [`HttpTestingController`](/api/common/http/testing/HttpTestingController) |
=======
>>>>>>> ae0253f34adad0e37d2a5e6596a08aa049ba3072
