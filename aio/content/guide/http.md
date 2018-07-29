# HttpClient

<!--
Most front-end applications communicate with backend services over the HTTP protocol. Modern browsers support two different APIs for making HTTP requests: the `XMLHttpRequest` interface and the `fetch()` API.
-->
����Ʈ���� ���ø����̼��� ��κ� HTTP ���������� ����ؼ� �鿣�� ���񽺿� ����� �մϴ�. �׸��� �ֽ� ���������� �� HTTP ��û�� ó���ϴ� API�� �� ������ �����ϴµ�, �ϳ��� `XMLHttpRequest` �������̽��̰� �ٸ� �ϳ��� `fetch()` API �Դϴ�.

<!--
The `HttpClient` in `@angular/common/http` offers a simplified client HTTP API for Angular applications
that rests on the `XMLHttpRequest` interface exposed by browsers.
Additional benefits of `HttpClient` include testability features, typed request and response objects, request and response interception, `Observable` apis, and streamlined error handling.
-->
`@angular/common/http` ���̺귯������ �����ϴ� `HttpClient`�� Angular ���ø����̼ǿ��� HTTP ��û�� �����ϰ� ���� �� �ֵ��� API�� �����ϴµ�, �� �� �������� `XMLHttpRequest` �������̽��� Ȱ���մϴ�.
�׸��� `XMLHttpRequest` ��� �ܿ� �׽�Ʈ ���� ���, HTTP ��û�� ���信 ���� ��ü ����, HTTP ��û�� ������ ����ä�� ���ͼ�Ʈ ���, `Observable` API, ��Ʈ������ ���� ó�� ������ �߰��� �����մϴ�.

<!--
You can run the <live-example></live-example> that accompanies this guide.
-->
�� �������� �ٷ�� ������ <live-example></live-example>���� ���� Ȯ���ϰų� �ٿ�޾� Ȯ���� �� �ֽ��ϴ�.

<div class="alert is-helpful">

<!--
The sample app does not require a data server.
It relies on the 
[Angular _in-memory-web-api_](https://github.com/angular/in-memory-web-api/blob/master/README.md),
which replaces the _HttpClient_ module's `HttpBackend`.
The replacement service simulates the behavior of a REST-like backend.

Look at the `AppModule` _imports_ to see how it is configured.
-->
�� �������� �ٷ�� ������ ������ ������ ���� �ʿ����� �ʽ��ϴ�.
�� ������ ������ _HttpClient_ ��⿡�� �����ϴ� `HttpBackend`�� Ȱ���ؼ�, ������ ���� ��� [Angular _�� �޸� �� API(in-memory-web-api)_](https://github.com/angular/in-memory-web-api/blob/master/README.md)�� ����� ���Դϴ�.
�� ����� REST API �鿣���� ������ ����ϱ⿡ ����մϴ�.

�� ���� ������ `AppModule` ���Ͽ��� �ϸ�, �� ���������� ���� �������� �ʽ��ϴ�.

</div>

<!--
## Setup
-->
## ȯ�漳��

<!--
Before you can use the `HttpClient`, you need to import the Angular `HttpClientModule`. 
Most apps do so in the root `AppModule`.
-->
`HttpClient`�� ����ϱ� ����, `HttpClientModule`�� �ε��ؾ� �մϴ�.
Ư���� ��찡 �ƴ϶�� �� ����� `AppModule`���� �ҷ��ɴϴ�.

<code-example 
  path="http/src/app/app.module.ts"
  region="sketch"
  title="app/app.module.ts (excerpt)" linenums="false">
</code-example>

<!--
Having imported `HttpClientModule` into the `AppModule`, you can inject the `HttpClient`
into an application class as shown in the following `ConfigService` example.
-->
`AppModule`�� `HttpClientModule`�� �ҷ����� ���� ���ø����̼� Ŭ������ `HttpClient`�� ���������� ������ �� �ֽ��ϴ�. ���� ��� `ConfigService`���� ����Ѵٸ� ������ ���� �ۼ��մϴ�.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="proto"
  title="app/config/config.service.ts (excerpt)" linenums="false">
</code-example>

<!--
## Getting JSON data
-->
## JSON ������ �ޱ�

<!--
Applications often request JSON data from the server. 
For example, the app might need a configuration file on the server, `config.json`, 
that specifies resource URLs.
-->
�������� �޴� �����ʹ� JSON ������ ��찡 �����ϴ�.
���� ��� ������ ���� ���ø����̼� ���� ������ �������� `config.json` ���Ϸ� �޾ƿ´ٰ� �սô�.

<code-example 
  path="http/src/assets/config.json"
  title="assets/config.json" linenums="false">
</code-example>

<!--
The `ConfigService` fetches this file with a `get()` method on `HttpClient`.
-->
�׷��� `ConfigService`���� `HttpClient` ������ `get()` �޼ҵ带 ����ؼ� �� ������ �޾ƿ� �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_1"
  title="app/config/config.service.ts (getConfig v.1)" linenums="false">
</code-example>

<!--
A component, such as `ConfigComponent`, injects the `ConfigService` and calls
the `getConfig` service method.
-->
�׸��� `ConfigComponent`�� ���� ������Ʈ���� `ConfigService`�� ���Թ޾Ƽ� `getConfig()` �޼ҵ带 �����ϸ�, �������� ������ ���� ������ ������ Ȯ���� �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v1"
  title="app/config/config.component.ts (showConfig v.1)" linenums="false">
</code-example>

<!--
Because the service method returns an `Observable` of configuration data,
the component **subscribes** to the method's return value.
The subscription callback copies the data fields into the component's `config` object,
which is data-bound in the component template for display.
-->
���񽺿� ������ �޼ҵ�� �����͸� `Observable` ��ü�� ��ȯ�ϱ� ������, ������Ʈ������ �� �޼ҵ带 �����ؾ� ��ȯ���� Ȯ���� �� �ֽ��ϴ�.
������Ʈ�� ���� �Լ������� �̷��� ������ �����ͷ� ������Ʈ�� `config` ��ü�� �����ϱ� ������, ���ø����� �� ��ü�� �����͸� Ȯ���� �� �ֽ��ϴ�.

<!--
### Why write a service
-->
### �� ���񽺸� �� �� ��ġ����?

<!--
This example is so simple that it is tempting to write the `Http.get()` inside the
component itself and skip the service.
-->
�̷��� ���캻 ������ ���� �����ϱ� ������, ���񽺸� �����ϰ� ������Ʈ�� `HttpClient`�� �����ϰ� �ٷ� `get()` �޼ҵ带 ����ϴ� ���� ���� ������ �ϴ� ������ �� ���� �ֽ��ϴ�.

<!--
However, data access rarely stays this simple.
You typically post-process the data, add error handling, and maybe some retry logic to
cope with intermittent connectivity.
-->
������ �������� �����͸� �������� ������ �̷��� �������� �ʽ��ϴ�.
�Ϲ������� �����͸� �������� �����ؾ� �ϰ�, ������ ó���ؾ� �ϸ�, ������ ������ ��쿡�� ��õ��ϴ� ������ �ʿ��մϴ�.

<!--
The component quickly becomes cluttered with data access minutia.
The component becomes harder to understand, harder to test, and the data access logic can't be re-used or standardized.
-->
�׷��� �����͸� ó���ϴ� ���������ε� ������Ʈ�� ������ �������� ���Դϴ�.
������Ʈ �ڵ�� ���� �����ϱ� ����� �� ���̰�, �׽�Ʈ�ϱ⵵ ���������, �����͸� �������� ������ ��Ȱ���ϱ⵵ ��������ϴ�.

<!--
That's why it is a best practice to separate presentation of data from data access by
encapsulating data access in a separate service and delegating to that service in
the component, even in simple cases like this one.
-->
�׷��� �������� ������ �����͸� ó���ϴ� ������ ���񽺿� �ۼ��ؼ� ������Ʈ�� �и��ϰ�, ������Ʈ������ �� �����͸� �޾Ƽ� Ȱ���ϴ� ������ �ۼ��ϴ� ���� �����ϴ�.

<!--
### Type-checking the response
-->
### �������� ���� ��ü�� Ÿ�� �����ϱ�

<!--
The subscribe callback above requires bracket notation to extract the data values.
-->
�������� Ÿ���� Ȯ���ϰ� �����ϱ� ���� ���� �Լ��� ������ ���� Ÿ���� ������ ���ô�.

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v1_callback" linenums="false">
</code-example>

<!--
You can't write `data.heroesUrl` because TypeScript correctly complains that the `data` object from the service does not have a `heroesUrl` property. 
-->
������ ������ `data.heroesUrl`�� ���� ����� �� �����ϴ�. �ֳ��ϸ� ���񽺿��� ���� `data` ��ü�� `heroesUrl` ������Ƽ�� �ִ��� TypeScript�� �� �� ���� �����Դϴ�.

<!--
The `HttpClient.get()` method parsed the JSON server response into the anonymous `Object` type. It doesn't know what the shape of that object is.
-->
`HttpClient.get()` �޼ҵ�� �������� ���� JSON �����͸� �׳� `Object` Ÿ������ ��ȯ�մϴ�. �� ��ü�� � �����Ͱ� �ִ����� ���� ���մϴ�.

<!--
You can tell `HttpClient` the type of the response to make consuming the output easier and more obvious.
-->
�� �� `HttpClient`�� ������ �������� Ÿ���� ������ �� �ֽ��ϴ�. �������� �޾ƿ� �������� Ÿ���� ��Ȯ�ϰ� �����ϸ� �� �����͸� Ȱ���ϱ⵵ �������ϴ�.

<!--
First, define an interface with the correct shape:
-->
����, �����͸� ǥ���ϴ� �������̽��� ������ ���� �����մϴ�:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="config-interface" linenums="false">
</code-example>

<!--
Then, specify that interface as the `HttpClient.get()` call's type parameter in the service:
-->
�׸��� `HttpClient.get()` �Լ��� ������ ��, ������ Ÿ���� �����մϴ�:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_2" 
  title="app/config/config.service.ts (getConfig v.2)" linenums="false">
</code-example>

<!--
The callback in the updated component method receives a typed data object, which is
easier and safer to consume:
-->
���� ������Ʈ������ ��Ȯ�� Ÿ���� ������ �� �ְ�, �� ��ü�� Ȱ���ϱ⵵ �� �������ϴ�:

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v2"
  title="app/config/config.component.ts (showConfig v.2)" linenums="false">
</code-example>

<!--
### Reading the full response
-->
## ��ü ���� ���� Ȯ���ϱ�

<!--
The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow. 
-->
�������� ���� �����͸����δ� ������� ���� ��찡 �ֽ��ϴ�. � ��쿡�� ����� �ִ� ������ HTTP ���� �ڵ带 Ȯ���ؼ� ���ø����̼��� ������ �����ؾ� �ϴ� ��쵵 �ֽ��ϴ�.

<!--
Tell `HttpClient` that you want the full response with the `observe` option:
-->
�� �� `HttpClient`�� �������� �������� ������ ��ü�� Ȯ���Ϸ��� `observe` �ɼ��� ����մϴ�:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfigResponse" linenums="false">
</code-example>

<!--
Now `HttpClient.get()` returns an `Observable` of typed `HttpResponse` rather than just the JSON data.
-->
�׷��� `HttpClient.get()` �޼ҵ�� ������ Ÿ���� JSON ������ ��� `HttpResponse` Ÿ�� ��ü�� `Observable`�� �����մϴ�.

<!--
The component's `showConfigResponse()` method displays the response headers as well as the configuration:
-->
�׸��� ������Ʈ���� `showConfigResponse()` �޼ҵ带 ����ó�� �ۼ��ϸ� HTTP ��ſ��� ���� ������ ����� Ȯ���� �� �ֽ��ϴ�:

<code-example 
  path="http/src/app/config/config.component.ts"
  region="showConfigResponse" 
  title="app/config/config.component.ts (showConfigResponse)"
  linenums="false">
</code-example>

<!--
As you can see, the response object has a `body` property of the correct type.
-->
�� �� `HttpResponse` ��ü�� `body` ������Ƽ�� ������ �����ߴ� Ÿ�԰� �����ϴ�.

<!--
## Error handling
-->
## ���� ó��

<!--
What happens if the request fails on the server, or if a poor network connection prevents it from even reaching the server? `HttpClient` will return an _error_ object instead of a successful response.
-->
������ ������ �־ HTTP ��û�� �����ϰų�, ��Ʈ��ũ ������ �������� ������ ������ �� ���ٸ� ��� �ɱ��? �̷� ������ �߻��ϸ� `HttpClient`�� �������� ���� ��� _����_ ��ü�� ��ȯ�մϴ�.

<!--
You _could_ handle in the component by adding a second callback to the `.subscribe()`:
-->
�׸��� �� ���� ��ü�� `.subscribe()` �Լ��� �����ϴ� �� ��° �ݹ� �Լ��� ó���� �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/config/config.component.ts"
  region="v3" 
  title="app/config/config.component.ts (showConfig v.3 with error handling)"
  linenums="false">
</code-example>

<!--
It's certainly a good idea to give the user some kind of feedback when data access fails.
But displaying the raw error object returned by `HttpClient` is far from the best way to do it.
-->
������ ����� �����ϸ� ����ڿ��� � ������ε� �˸��� ���� �����ϴ�.
������ �� �� `HttpClient`���� ���� ���� ��ü�� �״�� �����ϴ� ���� �ּ��� �ƴմϴ�.

{@a error-details}
<!--
### Getting error details
-->
### ���� �м��ϱ�

<!--
Detecting that an error occurred is one thing.
Interpreting that error and composing a user-friendly response is a bit more involved.
-->
������ �߻��� ���� Ȯ���ϴ� �͸����δ� ���� ó���� �ߴٰ� �� �� �����ϴ�.
�� ������ ����ڰ� �˾ƺ� �� �ִ� ���·� �����Ǿ�� �մϴ�.

<!--
Two types of errors can occur. The server backend might reject the request, returning an HTTP response with a status code such as 404 or 500. These are error _responses_.
-->
������ �� ���� ������ �߻��� �� �ֽ��ϴ�. �ϳ��� �������� ��û�� �ź��ϰų�, HTTP ���� �ڵ带 404�� 500���� ���� ����Դϴ�. �̷� ��츦 _���� ����(error response)_ �̶�� �մϴ�.

<!--
Or something could go wrong on the client-side such as a network error that prevents the request from completing successfully or an exception thrown in an RxJS operator. These errors produce JavaScript `ErrorEvent` objects.
-->
�� �ٸ� ���� Ŭ���̾�Ʈ���� �߻��ϴ� ��Ʈ��ũ ���� ������ ��û�� �Ϸ���� ���߰ų�, RxJS �����ڿ��� ���ܰ� �߻��ؼ� �߻��ϴ� ������ �ֽ��ϴ�. �̷� ������ JavaScript `ErrorEvent` ��ü�� �����մϴ�.

<!--
The `HttpClient` captures both kinds of errors in its `HttpErrorResponse` and you can inspect that response to figure out what really happened.
-->
`HttpClient`�� �� ������ ������ ��� `HttpErrorResponse` Ÿ������ ���� �� ������, �� ��ü�� Ȯ���ϸ� HTTP ��û�� � ������ �߸��Ǿ����� Ȯ���� �� �ֽ��ϴ�.

<!--
Error inspection, interpretation, and resolution is something you want to do in the _service_, 
not in the _component_.  
-->
������ �м��ϰ� ��ȯ�� �Ŀ� �ذ��ϴ� ���� _����_ �ȿ��� �ؾ� �մϴ�. _������Ʈ_ �� �ƴմϴ�.

<!--
You might first devise an error handler like this one:
-->
���� ó�� ������Ÿ���� ������ ���� �ۼ��� �� �ֽ��ϴ�:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="handleError" 
  title="app/config/config.service.ts (handleError)" linenums="false">
</code-example>

<!--
Notice that this handler returns an RxJS [`ErrorObservable`](#rxjs) with a user-friendly error message.
Consumers of the service expect service methods to return an `Observable` of some kind,
even a "bad" one.
-->
�� �Լ��� ����ڿ��� ǥ���� �޽����� RxJS [`ErrorObservable`](#rxjs) Ÿ������ ��ȯ�մϴ�.
�׷��� �� ���񽺿��� ������ ��ȯ�ϴ��� ���񽺸� ����ϴ� �ʿ����� �ᱹ `Observable`�� ���� �� �ְ� �˴ϴ�.

<!--
Now you take the `Observables` returned by the `HttpClient` methods
and _pipe them through_ to the error handler.
-->
���� ������Ʈ���� `HttpClient`�� ����� ���� �� _�������� ����ϸ�_ ������ ó���� �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig_3" 
  title="app/config/config.service.ts (getConfig v.3 with error handler)" linenums="false">
</code-example>

### `retry()`

<!--
Sometimes the error is transient and will go away automatically if you try again.
For example, network interruptions are common in mobile scenarios, and trying again
may produce a successful result.
-->
� ��쿡�� ������ �Ͻ����� ������ �Ǵ��ϰ� �ڵ����� ��õ��ؾ� �ϴ� ��찡 �ֽ��ϴ�.
Ư�� ����� ����̽��� ��쿡�� ������ ��� �������� ��찡 ���� �߻��ϸ�, ������ ��û�� �ٽ� ������ �� �ٷ� �����ϴ� ��쵵 ���� �ֽ��ϴ�.

<!--
The [RxJS library](#rxjs) offers several _retry_ operators that are worth exploring.
The simplest is called `retry()` and it automatically re-subscribes to a failed `Observable` a specified number of times. _Re-subscribing_ to the result of an `HttpClient` method call has the effect of reissuing the HTTP request.
-->
[RxJS library](#rxjs)���� �̷� ��쿡 Ȱ���� �� �ִ� _��õ�_ �����ڸ� ���������� �����մϴ�.
�� �� ���� ������ ���� `retry()` �������̸�, �� �����ڴ� `Observable`�� �������� �� ������ Ƚ����ŭ �ڵ����� �ٽ� �����մϴ�. �׸��� �� ������ �ٽ� ���۵Ǹ� HTTP ��û�� �ٽ� ����˴ϴ�.

<!--
_Pipe_ it onto the `HttpClient` method result just before the error handler.
-->
���� ó�� �������� ������ ���� �ۼ��մϴ�:

<code-example 
  path="http/src/app/config/config.service.ts"
  region="getConfig" 
  title="app/config/config.service.ts (getConfig with retry)" linenums="false">
</code-example>

{@a rxjs}
<!--
## Observables and operators
-->
## ��������� ������

<!--
The previous sections of this guide referred to RxJS `Observables` and operators such as `catchError` and `retry`.
You will encounter more RxJS artifacts as you continue below.
-->
���� ���ܿ��� ������ ��ó��, Angular ���ø����̼ǿ��� HTTP ��û�� �����ų� �����͸� �޾Ƽ� ó���� �� RxJS�� �����ϴ� `Observable`�� �����ڸ� Ȱ���� �� �ֽ��ϴ�.
RxJS���� �����ϴ� ����� �� �� �˾ƺ��ô�.

<!--
[RxJS](http://reactivex.io/rxjs/) is a library for composing asynchronous and callback-based code
in a _functional, reactive style_.
Many Angular APIs, including `HttpClient`, produce and consume RxJS `Observables`. 
-->
[RxJS](http://reactivex.io/rxjs/)�� �񵿱� ������ �ݹ� �ڵ带 _������(reactive)_ ��Ÿ�Ϸ� ������ �� ����ϴ� ���̺귯�� �Դϴ�.
Angular�� `HttpClient`�ܿ��� ���� ������ RxJS�� `Observable`�� ����մϴ�.

<!--
RxJS itself is out-of-scope for this guide. You will find many learning resources on the web.
While you can get by with a minimum of RxJS knowledge, you'll want to grow your RxJS skills over time in order to use `HttpClient` effectively.
-->
RxJS ��ü�� �� �������� �ٷ�� ������ �ƴմϴ�. RxJS ������� ������ ���� ã�ƺ� �� ������, �� ���������� `HttpClient`�� ȿ�������� ����� �� ���� �����θ� RxJS�� �˾ƺ��ô�.

<!--
If you're following along with these code snippets, note that you must import the RxJS observable and operator symbols that appear in those snippets. These `ConfigService` imports are typical.
-->
���� �ڵ带 �ۼ��� ���� RxJS�� ����ϴ� �ڵ忡 RxJS ��������� ������ �ɺ��� �ε��ؾ� �մϴ�. ���� ��� `ConfigService`��� ������ ���� �ۼ��մϴ�.

<code-example 
  path="http/src/app/config/config.service.ts"
  region="rxjs-imports" 
  title="app/config/config.service.ts (RxJS imports)" linenums="false">
</code-example>

<!--
## Requesting non-JSON data
-->
## JSON ������ �ƴ� ������ ��û�ϱ�

<!--
Not all APIs return JSON data. In this next example,
a `DownloaderService` method reads a text file from the server
and logs the file contents, before returning those contents to the caller
as an `Observable<string>`. 
-->
��� API�� JSON �����͸� ��ȯ�ϴ� ���� �ƴմϴ�. �̹��� ���캼 `DownloaderService`�� ���ǵ� �޼ҵ�� �������� �޾ƿ� �ؽ�Ʈ ������ ������ �α׿� ����ϰ� `Observable<string>` Ÿ������ ��ȯ�մϴ�.

<code-example 
  path="http/src/app/downloader/downloader.service.ts"
  region="getTextFile" 
  title="app/downloader/downloader.service.ts (getTextFile)" linenums="false">
</code-example>

<!--
`HttpClient.get()` returns a string rather than the default JSON because of the `responseType` option.
-->
���� `HttpClient.get()` �޼ҵ�� `responseType`�� �����߱� ������ JSON Ÿ�� ��� ���ڿ� Ÿ���� ��ȯ�մϴ�.

<!--
The RxJS `tap` operator (as in "wiretap") lets the code inspect good and error values passing through the observable without disturbing them. 
-->
�׸��� �� �� ���������� ����Ǵ� �帧�� �������� �����鼭 �ڵ带 ������ �� RxJS `tap` �����ڸ� ����մϴ�.

<!--
A `download()` method in the `DownloaderComponent` initiates the request by subscribing to the service method.
-->
������ �ڵ�� `DownloaderComponent`�� ���ǵ� `download()` �޼ҵ忡�� ������ ������ �� ����Ǹ�, �� �� HTTP ��û�� ���۵˴ϴ�.

<code-example 
  path="http/src/app/downloader/downloader.component.ts"
  region="download" 
  title="app/downloader/downloader.component.ts (download)" linenums="false">
</code-example>

<!--
## Sending data to the server
-->
## ������ ������ ������

<!--
In addition to fetching data from the server, `HttpClient` supports mutating requests, that is, sending data to the server with other HTTP methods such as PUT, POST, and DELETE.
-->
`HttpClient`�� ������ �����͸� ��û�� �� ����ϴ� HTTP �޼ҵ尡 PUT, POST, DELETE��� ������ �߰� �����͸� ���� �� �ֽ��ϴ�.

<!--
The sample app for this guide includes a simplified version of the "Tour of Heroes" example
that fetches heroes and enables users to add, delete, and update them.
-->
�̹� ���ܿ����� "����ε��� ����" Ʃ�丮�󿡼� ������� ����� �������� �߰�, ����, �����ߴ� ������ �����ϰ� �ٽ� ������ ���ϴ�.

<!--
The following sections excerpt methods of the sample's `HeroesService`.
-->
�������� �ٷ�� �ڵ�� `HeroesService`�� �ش�˴ϴ�.

<!--
### Adding headers
-->
### ��� �߰��ϱ�

<!--
Many servers require extra headers for save operations.
For example, they may require a "Content-Type" header to explicitly declare 
the MIME type of the request body.
Or perhaps the server requires an authorization token.
-->
�����͸� �����ϴ� HTTP ��û�̶�� ����� �߰� ������ ������ �ϴ� ��찡 �����ϴ�.
������ �������� MIME Ÿ���� � ������ �����ϴ� "Content-Type" ����� �� �� �ϳ��Դϴ�.
�ƴϸ� Ŭ���̾�Ʈ�� ���� ������ ���� ����� ��û�� ���� �ֽ��ϴ�.

<!--
The `HeroesService` defines such headers in an `httpOptions` object that will be passed
to every `HttpClient` save method.
-->
`HeroesService`�� ����� ���õ� HTTP ��û�� ����� �ɼ��� `httpOptions` ��ü�� �����սô�. �� �ɼǿ� ����� �����Ϸ��� ������ ���� �ۼ��մϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="http-options" 
  title="app/heroes/heroes.service.ts (httpOptions)" linenums="false">
</code-example>

<!--
### Making a POST request
-->
### POST ��û ������

<!--
Apps often POST data to a server. They POST when submitting a form. 
In the following example, the `HeroesService` posts when adding a hero to the database.
-->
�����ʹ� POST ������� ���� ���� �ֽ��ϴ�. �Ϲ������� POST �޼ҵ�� ���� ������ ���� ����ϸ�, �츮�� ���캸�� �ִ� `HeroesService`������ ����θ� DB�� �߰��� �� ����մϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="addHero" 
  title="app/heroes/heroes.service.ts (addHero)" linenums="false">
</code-example>

<!--
The `HttpClient.post()` method is similar to `get()` in that it has a type parameter
(you're expecting the server to return the new hero)
and it takes a resource URL.
-->
`HttpClient.post()` �޼ҵ�� `get()`�޼ҵ�� ����մϴ�. �����κ��� �޾ƿ� �������� Ÿ���� ���׸����� �����ϰ�, ù��° ���ڷ� ���� API�� URL�� �޴� �͵� �����ϴ�.

<!--
It takes two more parameters:

1. `hero` - the data to POST in the body of the request.
1. `httpOptions` - the method options which, in this case, [specify required headers](#adding-headers).
-->
���⿡ ���ڸ� �� �� �� �߰��մϴ�.

1. `hero` - POST �޼ҵ��� �� ��û���� ���� body �����͸� �����մϴ�.
1. `httpOptions` - HTTP ��û�� ���� �ɼ��� �����մϴ�. [��� �߰��ϱ�](#���-�߰��ϱ�)���� ������ �ɼ��Դϴ�.

<!--
Of course it catches errors in much the same manner [described above](#error-details).
-->
�׸��� ������ ó���ϴ� ��ĵ� [������ ������ ����](#error-details)�� �����ϴ�.

<!--
The `HeroesComponent` initiates the actual POST operation by subscribing to 
the `Observable` returned by this service method.
-->
���� `HeroesComponent`�� ���������� �����ϸ� POST ��û�� �߻��ϸ�, ������ �������� ���� ������ `Observable` Ÿ������ ���޵˴ϴ�.

<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="add-hero-subscribe" 
  title="app/heroes/heroes.component.ts (addHero)" linenums="false">
</code-example>

<!--
When the server responds successfully with the newly added hero, the component adds
that hero to the displayed `heroes` list.
-->
�׷��� ���ο� ����ΰ� ���������� �߰��Ǿ��ٴ� ���� ������Ʈ�� �� �� �ְ�, `heroes` �迭�� �� ����θ� �߰��ؼ� ���ο� ������� ȭ�鿡 ǥ���� �� �ֽ��ϴ�.

<!--
### Making a DELETE request
-->
### DELETE ��û ������

<!--
This application deletes a hero with the `HttpClient.delete` method by passing the hero's id
in the request URL.
-->
�� ���񽺴� ����θ� ������ �� `HttpClient.delete` �޼ҵ带 Ȱ���ϸ�, �����Ϸ��� ������� ID�� url�� ���Խ��� �����ϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="deleteHero" 
  title="app/heroes/heroes.service.ts (deleteHero)" linenums="false">
</code-example>

<!--
The `HeroesComponent` initiates the actual DELETE operation by subscribing to 
the `Observable` returned by this service method.
-->
�� �޼ҵ嵵 `HeroesComponent`�� ������ �� ����Ǳ� �����ϸ�, �޼ҵ尡 ����Ǹ鼭 DELETE ��û�� ���۵˴ϴ�. �׸��� �޼ҵ� �������� `Observable` Ÿ������ ��ȯ�˴ϴ�.

<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-subscribe" 
  title="app/heroes/heroes.component.ts (deleteHero)" linenums="false">
</code-example>

<!--
The component isn't expecting a result from the delete operation, so it subscribes without a callback. Even though you are not using the result, you still have to subscribe. Calling the `subscribe()` method _executes_ the observable, which is what initiates the DELETE request. 
-->
������Ʈ�� ���� ������ ������� Ȱ������ �ʱ� ������ �ݹ��Լ� ���� ������ �����߽��ϴ�. �������� ������ �̷��� �������� �������� �����鼭 ������ ���� �ֽ��ϴ�. `subscribe()` �޼ҵ尡 ����Ǹ� ���������� ����ǰ�, DELETE ��û�� ���۵˴ϴ�.

<div class="alert is-important">

<!--
You must call _subscribe()_ or nothing happens. Just calling `HeroesService.deleteHero()` **does not initiate the DELETE request.**
-->
���������� _subscribe()_ �Լ��� �����ؾ� ���۵˴ϴ�. `HeroesService.deleteHero()`�� ȣ���ϴ� �͸����δ� **DELETE ��û�� ���۵��� �ʽ��ϴ�.**

</div>


<code-example 
  path="http/src/app/heroes/heroes.component.ts"
  region="delete-hero-no-subscribe" linenums="false">
</code-example>

{@a always-subscribe}
<!--
**Always _subscribe_!**
-->
**_subscribe()_ �� �� �־�� �մϴ�!**

<!--
An `HttpClient` method does not begin its HTTP request until you call `subscribe()` on the observable returned by that method. This is true for _all_ `HttpClient` _methods_.
-->
`HttpClient`���� �����ϴ� ��� �޼ҵ�� `subscribe()` ���� HTTP ��û�� ���۵��� �ʽ��ϴ�.

<div class="alert is-helpful">

<!--
The [`AsyncPipe`](api/common/AsyncPipe) subscribes (and unsubscribes) for you automatically.
-->
���ø����� [`AsyncPipe`](api/common/AsyncPipe)�� ����ϸ� ���������� �ڵ����� �����ϰ� �����մϴ�.

</div>

<!--
All observables returned from `HttpClient` methods are _cold_ by design.
Execution of the HTTP request is _deferred_, allowing you to extend the
observable with additional operations such as  `tap` and `catchError` before anything actually happens.
-->
`HttpClient` �޼ҵ尡 ��ȯ�ϴ� ���������� ��� _�ݵ� ��������(cold observable)_ �Դϴ�.
���������� �����ϴ� ��ü�� ������ HTTP ��û�� ���۵��� ������, `tap`�̳� `catchError`�� ���� RxJS �����ڸ� �����ص� ���� ������ �ƹ��͵� ������� �ʽ��ϴ�.

<!--
Calling `subscribe(...)` triggers execution of the observable and causes
`HttpClient` to compose and send the HTTP request to the server.
-->
�׸��� `subscribe(...)`�� �����ؾ� ���������� ���۵ǰ� HTTP ��û�� �߻��մϴ�.

<!--
You can think of these observables as _blueprints_ for actual HTTP requests.
-->
���������� ���� HTTP ��û�� ǥ���Ѵٰ� ������ ���� �ֽ��ϴ�.

<div class="alert is-helpful">

<!--
In fact, each `subscribe()` initiates a separate, independent execution of the observable.
Subscribing twice results in two HTTP requests.
-->
`subscribe()` �Լ��� ����� ������ ���ο� ���������� �����մϴ�.
�׷��� �� �Լ��� �� �� ����Ǹ� HTTP ��û�� �� �� �߻��մϴ�.

<!--
```javascript
const req = http.get<Heroes>('/api/heroes');
// 0 requests made - .subscribe() not called.
req.subscribe();
// 1 request made.
req.subscribe();
// 2 requests made.
```
-->
```javascript
const req = http.get<Heroes>('/api/heroes');
// ��û Ƚ�� 0 - .subscribe() �� ���� ������� �ʾҽ��ϴ�.
req.subscribe();
// ��û Ƚ�� 1
req.subscribe();
// ��û Ƚ�� 2
```
</div>

<!--
### Making a PUT request
-->
### PUT ��û ������

<!--
An app will send a PUT request to completely replace a resource with updated data.
The following `HeroesService` example is just like the POST example.
-->
�����͸� ��ü�ϴ� ����� PUT �޼ҵ带 Ȱ���� �� �ֽ��ϴ�.
`HeroesService` ���� PUT �޼ҵ带 ����ϴ� �ڵ�� POST���� ����ô� �Ͱ� ����մϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="updateHero" 
  title="app/heroes/heroes.service.ts (updateHero)" linenums="false">
</code-example>

<!--
For the reasons [explained above](#always-subscribe), the caller (`HeroesComponent.update()` in this case) must `subscribe()` to the observable returned from the `HttpClient.put()`
in order to initiate the request.
-->
[������ �����ߴ� ��ó��](#always-subscribe), �� �޼ҵ嵵 ���������� `subscribe()`�� ����Ǿ�� HTTP ��û�� ���۵˴ϴ�.

<!--
## Advanced usage
-->
## �� Ȱ���ϱ�

<!--
We have discussed the basic HTTP functionality in `@angular/common/http`, but sometimes you need to do more than make simple requests and get data back.
-->
���ݱ��� `@angular/common/http`���� �����ϴ� �⺻ HTTP ����� ����ý��ϴ�. �������ʹ� HttpClient�� ���� ��Ȳ�� �°� �� �� Ȱ���ϴ� ����� ���� �˾ƺ��ô�.

<!--
### Configuring the request
-->
### HTTP ��û �����ϱ�

<!--
Other aspects of an outgoing request can be configured via the options object
passed as the last argument to the `HttpClient` method.
-->
HTTP ��û�� ���� �� Ȱ���ϴ� `HttpClient` �޼ҵ忡 ������ ���ڸ� �����ϸ� ��û�� ���� �ɼ��� ������ �� �ֽ��ϴ�.

<!--
You [saw earlier](#adding-headers) that the `HeroesService` sets the default headers by
passing an options object (`httpOptions`) to its save methods.
You can do more.
-->
[�̹� ������ �ô� ��ó��](#���-�߰��ϱ�) `HeroesService`�� `httpOptions` ��ü�� ����ؼ� ����� �����ϰ� �ֽ��ϴ�.
��� �ܿ� �ٸ� �ɼ��� �� ������ ���ô�.

<!--
#### Update headers
-->
#### ��� �����ϱ�

<!--
You can't directly modify the existing headers within the previous options
object because instances of the `HttpHeaders` class are immutable.
-->
������ �� �����ϸ鼭 ���� Httpheaders ��ü�� ������Ƽ�� ���� ������ �� �����ϴ�. �ֳ��ϸ� `HttpHeaders` Ŭ������ �̹��ͺ�(immutable)�̱� �����Դϴ�.

<!--
Use the `set()` method instead. 
It returns a clone of the current instance with the new changes applied.
-->
��� `set()` �޼ҵ带 Ȱ���մϴ�. �� �޼ҵ带 �����ϸ� ���ο� ���� ����� �ν��Ͻ��� ��ȯ�մϴ�.

<!--
Here's how you might update the authorization header (after the old token expired) 
before making the next request.
-->
������ �߱޹��� ���� ��ū�� ����Ǿ��ٰ� �����ϰ�, ���ο� ��û�� ���� ����� `Authorization` �ʵ带 �����ϴ� �ڵ�� ������ ���� �ۼ��մϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="update-headers" linenums="false">
</code-example>

<!--
#### URL Parameters
-->
#### URL ����

<!--
Adding URL search parameters works a similar way.
Here is a `searchHeroes` method that queries for heroes whose names contain the search term.
-->
URL�� Ȱ���ϸ� �˻���� ���� ���ڸ� �߰��� ������ �� �ֽ��ϴ�.
���� ���캸�� `searchHeroes` �޼ҵ�� �Էµ� �ܾ �̸��� ���Ե� ����θ� ã�� �Լ��Դϴ�.

<code-example 
  path="http/src/app/heroes/heroes.service.ts"
  region="searchHeroes" linenums="false">
</code-example>

<!--
If there is a search term, the code constructs an options object with an HTML URL-encoded search parameter. If the term were "foo", the GET request URL would be `api/heroes/?name=foo`.
-->
�� �Լ��� ���ڸ� ������ HTML URL ������� ���ڵ� �� ��ü�� �����մϴ�. ���� "foo"��� ���ڰ� ���޵Ǹ�, �� ���ڸ� �����ؼ� ��û�ϴ� GET �ּҴ� `api/heroes/?name=foo`�� �� ���Դϴ�.

<!--
The `HttpParams` are immutable so you'll have to use the `set()` method to update the options.
-->
`HttpParams`�� �̹��ͺ� Ŭ�����̱� ������, ���� �����Ϸ��� `set()` �޼ҵ带 ����ؾ� �մϴ�.

<!--
### Debouncing requests
-->
### ���ӵ� ��û ó���ϱ� (debouncing request)

<!--
The sample includes an _npm package search_ feature.
-->
�̹����� _npm ��Ű���� �˻��ϴ� ���_ �� ������ ���ô�.

<!--
When the user enters a name in a search-box, the `PackageSearchComponent` sends
a search request for a package with that name to the NPM web API.
-->
����ڰ� `PackageSearchComponent`�� �ִ� �˻� �ʵ忡 �ؽ�Ʈ�� �Է��ϸ�, �� ���� NPM �� API�� ������ �ش� ��Ű���� �ִ��� �˻��Ϸ��� �մϴ�.

<!--
Here's a pertinent excerpt from the template:
-->
����, ���ø��� �̷��� �����մϴ�:

<code-example 
  path="http/src/app/package-search/package-search.component.html"
  region="search" 
  title="app/package-search/package-search.component.html (search)">
</code-example>

<!--
The `(keyup)` event binding sends every keystroke to the component's `search()` method.
-->
�׷��� `(keyup)` �̺�Ʈ�� ���ε� �Ǿ��� ������, Ű �Է��� �߻��� ������ ������Ʈ�� `search()` �޼ҵ尡 ����˴ϴ�.

<!---
Sending a request for every keystroke could be expensive.
It's better to wait until the user stops typing and then send a request.
That's easy to implement with RxJS operators, as shown in this excerpt.
-->
������ Ű�Է��� ���� ������ HTTP ��û�� ������ ���� ȿ�������� �ʽ��ϴ�.
�̷� ���� ����ڰ� �Է��� ���߱⸦ ��ٷȴٰ� ��û�� ������ ���� �� �����ϴ�.
�� ������ RxJS �����ڸ� Ȱ���ϸ� ���� ������ �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/package-search/package-search.component.ts"
  region="debounce" 
  title="app/package-search/package-search.component.ts (excerpt))">
</code-example>

<!--
The `searchText$` is the sequence of search-box values coming from the user.
It's defined as an RxJS `Subject`, which means it is a multicasting `Observable`
that can also produce values for itself by calling `next(value)`,
as happens in the `search()` method.
-->
`searchText$`�� �˻� �ʵ忡�� ����ڰ� �Է��ϴ� ���ڿ��� ǥ���մϴ�.
�� ������Ƽ�� RxJS `Subject` Ÿ������ ���ǵǾ��µ�, �� ��ü�� `Observable`�� ��ӹ޾� ���� ��ü�̸�, `next(��)` �޼ҵ带 �����ϸ� ���� ���� ���� ���� �� �ֵ��� Ȯ��� ��ü�Դϴ�. �� �ڵ忡���� `next()`�� ����� ������ `search()` �޼ҵ尡 ����˴ϴ�.

<!--
Rather than forward every `searchText` value directly to the injected `PackageSearchService`,
the code in `ngOnInit()` _pipes_ search values through three operators:
-->
��� �Է°��� `PackageSearchService`�� ������ ���, �� �ڵ忡���� `ngOnInit()` �޼ҵ忡 _������_ �� ����ؼ� ������ 3���� �����մϴ�:

<!--
1. `debounceTime(500)` - wait for the user to stop typing (1/2 second in this case).
1. `distinctUntilChanged()` - wait until the search text changes.
1. `switchMap()` - send the search request to the service.
-->
1. `debounceTime(500)` - ������� �Է��� ���ߴ� ���� ��ٸ��ϴ�. �� �ڵ��� ���� 500ms ��ٸ��ϴ�.
1. `distinctUntilChanged()` - �Է� �ʵ��� ���� ������ ����Ǵ� ���� ��ٸ��ϴ�.
1. `switchMap()` - ���񽺷� ��û�� �����ϴ�.

<!--
The code sets `packages$` to this re-composed `Observable` of search results.
The template subscribes to `packages$` with the [AsyncPipe](api/common/AsyncPipe)
and displays search results as they arrive.
-->
�� �ڵ忡�� `packages$`�� �˻� ����� �޴� `Observable`�� ǥ���մϴ�.
�׸��� �� ������Ƽ�� ���ø����� [AsyncPipe](api/common/AsyncPipe)�� ����ؼ� �����ϱ� ������, ������ �ö� �ڵ����� ���ø��� ���ŵ˴ϴ�.

<!--
A search value reaches the service only if it's a new value and the user has stopped typing.
-->
�̷��� �ۼ��ϸ� ����ڰ� ������ ��, ���ο� ���� ���� ���񽺷� �˻�� ���޵˴ϴ�.

<div class="alert is-helpful">

<!--
The `withRefresh` option is explained [below](#cache-refresh).
-->
`withRefresh` �ɼ��� [�Ʒ�](#cache-refresh)���� �ٽ� �˾ƺ��ϴ�.

</div>

#### _switchMap()_

<!--
The `switchMap()` operator has three important characteristics.
-->
`switchMap()` �����ڿ��� �߿��� Ư¡�� 3���� �ֽ��ϴ�.

<!--
1. It takes a function argument that returns an `Observable`.
`PackageSearchService.search` returns an `Observable`, as other data service methods do.
-->
1. �� �����ڴ� ���ڷ� `Observable`�� ��ȯ�ϴ� �Լ��� �޽��ϴ�.
`PackageSearchService.search` �Լ��� ���������� ��ȯ�ϱ� ������ �� �ڵ忡 ����߽��ϴ�.

<!--
2. If a previous search request is still _in-flight_ (as when the connection is poor),
it cancels that request and sends a new one.
-->
2. ������ ������ �˻� ��û�� _���� �Ϸ���� �ʾ�����_ ���� ��û�� ����ϰ� ���ο� ��û�� �����ϴ�. 

<!--
3. It returns service responses in their original request order, even if the
server returns them out of order. 
-->
3. �� �����ڴ� �����ڿ� ���޵� ��Ʈ�� ������ ����� ��ȯ�մϴ�. �������� � ������ ��ȯ�ϴ����� ��������ϴ�.

<div class="alert is-helpful">

<!--
If you think you'll reuse this debouncing logic,
consider moving it to a utility function or into the `PackageSearchService` itself.
-->
�� ������ ��Ȱ���Ϸ��� �� ������ ��ġ�� ������Ʈ ��� `PackageSearchService`�� �ű�� ���� �����ϴ�.

</div>

<!--
### Intercepting requests and responses
-->
### HTTP ��û/���� ����ä��

<!--
_HTTP Interception_ is a major feature of `@angular/common/http`. 
With interception, you declare _interceptors_ that inspect and transform HTTP requests from your application to the server.
The same interceptors may also inspect and transform the server's responses on their way back to the application.
Multiple interceptors form a _forward-and-backward_ chain of request/response handlers.
-->
_HTTP ��û�� ������ ����ä�� ����_ �� `@angular/common/http`���� �����ϴ� �ֿ� ��� �� �ϳ��Դϴ�.
HTTP ��û�� ����ä����, ���� ���ø����̼ǿ��� ������ ������ HTTP ��û�� Ȯ���ϰ� ������ �� �ִ� _���ͼ���(interceptor)_ �� �����ؾ� �մϴ�.
�׸��� �̷��� ������ ���ͼ��ͷ� �������� ���ø����̼����� ���ϴ� HTTP ���䵵 Ȯ���ϰ� ������ �� �ֽ��ϴ�.
���ͼ��ʹ� ���� ���� ������� ����ǵ��� ü�̴��� ���� �ֽ��ϴ�.

<!--
Interceptors can perform a variety of  _implicit_ tasks, from authentication to logging, in a routine, standard way, for every HTTP request/response. 
-->
���ͼ��ʹ� �پ��� ����� ������ �� �ֽ��ϴ�. �Ϲ������δ� HTTP ��û/���信 ���� ����� ���� ������ Ȯ���ϰ� �α׸� ����ϱ� ���� ����մϴ�.

<!--
Without interception, developers would have to implement these tasks _explicitly_ 
for each `HttpClient` method call.
-->
���� ���ͼ��͸� ������� �ʴ´ٸ�, ��� `HttpClient` �޼ҵ尡 ����� ������ �ʿ��� �۾��� _����_ ó���ؾ� �մϴ�.

<!--
#### Write an interceptor
-->
#### ���ͼ��� �����ϱ�

<!--
To implement an interceptor, declare a class that implements the `intercept()` method of the `HttpInterceptor` interface.
-->
���ͼ��͸� �����Ϸ���, `HttpInterceptor` �������̽��� ����ϴ� Ŭ������ �����ϰ� �� Ŭ���� �ȿ� `intercept()` �޼ҵ带 �����ϸ� �˴ϴ�.

<!--
 Here is a do-nothing _noop_ interceptor that simply passes the request through without touching it:
-->
���� �ڵ�� ���� HTTP ��û�� �������� �ʰ� �״�� �����Ű�� ���ͼ��� �⺻ �ڵ��Դϴ�:
<code-example 
  path="http/src/app/http-interceptors/noop-interceptor.ts"
  title="app/http-interceptors/noop-interceptor.ts"
  linenums="false">
</code-example>

<!--
The `intercept` method transforms a request into an `Observable` that eventually returns the HTTP response. 
In this sense, each interceptor is fully capable of handling the request entirely by itself.
-->
`intercept` �޼ҵ�� `Observable` Ÿ������ HTTP ��û�� �޾Ƽ� HTTP ������ ��ȯ�մϴ�.
�̰͸� ����, ������ ���ͼ��ʹ� HTTP ��û�� ���� ��� ���� ������ �� �ֽ��ϴ�.

<!--
Most interceptors inspect the request on the way in and forward the (perhaps altered) request to the `handle()` method of the `next` object which implements the [`HttpHandler`](api/common/http/HttpHandler) interface.
-->
�Ϲ������� ���ͼ��ʹ� ��û�� �����ų� ������ �޴� ������ �״�� �����ϱ� ����, [`HttpHandler`](api/common/http/HttpHandler) �������̽��� ���� `next` ������ `handle()` �޼ҵ带 ȣ���մϴ�.

```javascript
export abstract class HttpHandler {
  abstract handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
```

<!--
Like `intercept()`, the `handle()` method transforms an HTTP request into an `Observable` of [`HttpEvents`](#httpevents) which ultimately include the server's response. The `intercept()` method could inspect that observable and alter it before returning it to the caller.
-->
`intercept()`�� ����ϰ�, `handle()` �޼ҵ嵵 HTTP ��û���� ���� ���������� [`HttpEvents`](#httpevents) Ÿ���� ��������� ��ȯ�ϸ�, �� Ÿ���� ������ ���� ������ ǥ���ϴ� Ÿ���Դϴ�. `intercept()` �޼ҵ�� �̷��� ���� ������ ������ Ȯ���� �� ������, HTTP ��û�� ������ ���ؽ�Ʈ�� ���ư��� ������ ���������� ������ ������ �� �ֽ��ϴ�.

<!--
This _no-op_ interceptor simply calls `next.handle()` with the original request and returns the observable without doing a thing.
-->
���� HTTP ��û�̳� ������ �������� �ʰ� �״�� �����Ű���� �ܼ��ϰ� `next.handle()`�� �����ϸ� �˴ϴ�.

<!--
#### The _next_ object
-->
#### _next_ ��ü

<!--
The `next` object represents the next interceptor in the chain of interceptors. 
The final `next` in the chain is the `HttpClient` backend handler that sends the request to the server and receives the server's response.
-->
`next` ��ü�� ü���õǴ� ���ͼ��� �� �������� ����� ���ͼ��͸� �ǹ��մϴ�.
�׸��� ���ͼ��� ü�� �� ������ ���ͼ��Ͱ� �޴� `next` ��ü�� `HttpClient` �鿣�� �ڵ鷯�̸�, �� �ڵ鷯�� ������ HTTP ��û�� ������ ������ ������ ù��°�� �޴� �ڵ鷯�Դϴ�.

<!--
Most interceptors call `next.handle()` so that the request flows through to the next interceptor and, eventually, the backend handler.
An interceptor _could_ skip calling `next.handle()`, short-circuit the chain, and [return its own `Observable`](#caching) with an artificial server response. 
-->
���ͼ��ʹ� ��κ� HTTP ��û�� ����Ǵ� �帧�� �״�� �����ϱ� ���� `next.handle()`�� �����ϸ�, ���������δ� �鿣�� �ڵ鷯�� ����˴ϴ�.
������ ������ ������ �ùķ��̼��ϴ� ����� `next.handle()`�� �������� �ʰ� [�ٷ� `Observable`](#ĳ��)�� ��ȯ�ϸ鼭 ���ͼ��� ü���� ���� ���� �ֽ��ϴ�.

<!--
This is a common middleware pattern found in frameworks such as Express.js.
-->
�� ����� Express.js�� ���� �����ӿ�ũ���� �̵���� �������� ���� ����ϴ� ����Դϴ�.

<!--
#### Provide the interceptor
-->
#### ���ͼ��� �����ϱ�

<!--
The `NoopInterceptor` is a service managed by Angular's [dependency injection (DI)](guide/dependency-injection) system. 
Like other services, you must provide the interceptor class before the app can use it.
-->
�̷��� ������ `NoopInterceptor`�� Angular [������ ���� (DI)](guide/dependency-injection) ü�迡�� �����Ǵ� Angular ���� �Դϴ�.
�׷��� �ٸ� ���񽺿� ����ϰ�, ���ø����̼ǿ� ����ϱ� ���� ���ι��̴��� ����ؾ� �մϴ�.

<!--
Because interceptors are (optional) dependencies of the `HttpClient` service, 
you must provide them in the same injector (or a parent of the injector) that provides `HttpClient`. 
Interceptors provided _after_ DI creates the `HttpClient` are ignored.
-->
���ͼ��ʹ� `HttpClient` ���񽺿� �������̱� ������, `HttpClient`�� �����ϴ� �����ͳ� �� �������� ���� �����Ϳ� ��ϵǾ�� �մϴ�.
`HttpClient`�� �̹� ������ _���Ŀ�_ ��ϵǴ� ���ͼ��ʹ� �������� �ʽ��ϴ�.

<!--
This app provides `HttpClient` in the app's root injector, as a side-effect of importing the `HttpClientModule` in `AppModule`.
You should provide interceptors in `AppModule` as well.
-->
�������� �ٷ�� ���� `AppModule`�� `HttpClientModule`�� �ε��ϰ� �ֱ� ������ ���ø����̼��� �ֻ��� �����Ϳ� `HttpClient`�� �ε� �˴ϴ�. ����, �� ����� `AppModule`�� ���ͼ��͸� ����ؾ� �մϴ�.

<!--
After importing the `HTTP_INTERCEPTORS` injection token from `@angular/common/http`,
write the `NoopInterceptor` provider like this:
-->
���ͼ��͸� ����Ϸ��� `@angular/common/http`���� `HTTP_INTERCEPTORS` ������ ���� ��ū�� �ҷ��ͼ� ������ ���� �ۼ��մϴ�:

<code-example 
  path="http/src/app/http-interceptors/index.ts"
  region="noop-provider" linenums="false">
</code-example>

<!--
Note the `multi: true` option. 
This required setting tells Angular that `HTTP_INTERCEPTORS` is a token for a _multiprovider_ 
that injects an array of values, rather than a single value.
-->
�� �� `multi: true` �ɼ��� �����߽��ϴ�.
�� �ɼ��� �����ϸ� `HTTP_INTERCEPTORS` ��ū���� ����Ǵ� ���ͼ��Ͱ� �ϳ��� �ִ� ���� �ƴ϶�, _���� ��_ �ִٴ� ���� �ǹ��մϴ�.

<!--
You _could_ add this provider directly to the providers array of the `AppModule`.
However, it's rather verbose and there's a good chance that 
you'll create more interceptors and provide them in the same way.
You must also pay [close attention to the order](#interceptor-order) 
in which you provide these interceptors.
-->
�� ���ι��̴� ������ `AppModule`�� ���ι��̴� �迭�� �ٷ� �߰��� �� �ֽ��ϴ�.
������ ���ͼ��Ͱ� ������ �ִٸ�, �� ���ι��̴� ������ �� ���� ��� ����ϴ� ����� �����ϴ�.
�̷��� ���ͼ��� ���� ���� ���ÿ� �����Ѵٸ�, [���ͼ��Ͱ� ����Ǵ� ����](#���ͼ���-����-����)�� �����ؾ� �մϴ�.

<!--
Consider creating a "barrel" file that gathers all the interceptor providers into an `httpInterceptorProviders` array, starting with this first one, the `NoopInterceptor`.
-->
���ͼ��� ���ι��̴��� ��� ���� �ϳ��� ������, `httpInterceptorProviders` �迭�� ������ ���ô�. ����, ������ ���� `NoopInterceptor`�� ������ ���� �߰��մϴ�.

<code-example 
  path="http/src/app/http-interceptors/index.ts"
  region="interceptor-providers"
  title="app/http-interceptors/index.ts" linenums="false">
</code-example>

<!--
Then import and add it to the `AppModule` _providers array_ like this:
-->
�׸��� `AppModule`�� �ۼ��ߴ� _���ι��̴� �迭_ �� ������ ���� �����մϴ�:

<code-example 
  path="http/src/app/app.module.ts"
  region="interceptor-providers"
  title="app/app.module.ts (interceptor providers)" linenums="false">
</code-example>

<!--
As you create new interceptors, add them to the `httpInterceptorProviders` array and
you won't have to revisit the `AppModule`.
-->
���� ���ο� ���ͼ��͸� �߰����� �� `httpInterceptorProviders`�� ����ϱ⸸ �ϸ�, `AppModule`�� ���� �������� �ʾƵ� �˴ϴ�.

<div class="alert is-helpful">

<!--
There are many more interceptors in the complete sample code.
-->
�� ������ ���� ���� �ڵ忡�� �� ���� ���ͼ��Ͱ� ���Ǿ����ϴ�.

</div>

<!--
#### Interceptor order
-->
#### ���ͼ��� ���� ����

<!--
Angular applies interceptors in the order that you provide them.
If you provide interceptors _A_, then _B_, then _C_,  requests will flow in _A->B->C_ and
responses will flow out _C->B->A_.
-->
���ͼ��ʹ� ����� ������� ����˴ϴ�.
�׷��� ���ͼ��� _A_, _B_, _C_ ������� �����ϸ�, HTTP ��û�� _A->B->C_ ������ ó���ǰ� HTTP ������ _C->B->A_ ������ ó���˴ϴ�.

<!--
You cannot change the order or remove interceptors later.
If you need to enable and disable an interceptor dynamically, you'll have to build that capability into the interceptor itself.
-->
���ͼ��͸� ����� ���Ŀ� ���� ������ �����ϰų� Ư�� ���ͼ��͸� �ǳʶ� ���� �����ϴ�.
���ͼ��͸� �������� �ǳʶپ�� ���� �����Ϸ��� ���ͼ��� �ȿ� �������� ������ �ۼ��ؾ� �մϴ�.

#### _HttpEvents_

<!--
You may have expected the `intercept()` and `handle()` methods to return observables of `HttpResponse<any>` as most `HttpClient` methods do.
-->
`intercept()`�� `handle()` �޼ҵ�� `HttpClient`���� �����ϴ� �ٸ� �޼ҵ��ó�� `HttpResponse<any>` Ÿ���� ���������� ��ȯ�� ���̶�� ������ �� �ֽ��ϴ�.

<!--
Instead they return observables of `HttpEvent<any>`.
-->
������ �� ����� �ٸ���, ���ͼ��Ϳ��� ����ϴ� �Լ����� `HttpEvent<any>` Ÿ���� ���������� ��ȯ�մϴ�.

<!--
That's because interceptors work at a lower level than those `HttpClient` methods. A single HTTP request can generate multiple _events_, including upload and download progress events. The `HttpResponse` class itself is actually an event, whose type is `HttpEventType.HttpResponseEvent`.
-->
��ȯ������ �ٸ� ������ ���ͼ��Ͱ� `HttpClient`���� �����ϴ� �޼ҵ�麸�� �� ���� �������� �����ϱ� �����Դϴ�. HTTP ��û�� �� �� ����Ǵ� ���� _�̺�Ʈ_ �� ������ �߻��� �� �ִµ�, ���ε� ������̳� �ٿ�ε� ������� ���� �̺�Ʈ�� �̷� �̺�Ʈ�� ���Ե˴ϴ�. `HttpResponse` Ŭ������ �̷� �̺�Ʈ �� �ϳ��� �ǹ��ϸ�, �����ε� `HttpEventType.HttpResponseEvent`���� ���ǵǾ� �ֽ��ϴ�.

<!--
Many interceptors are only concerned with the outgoing request and simply return the event stream from `next.handle()` without modifying it.
-->
�� ���ͼ��Ϳ��� �� �ܰ迡�� �ʿ��� ������ ������ ���� ���������� ��κ� `next.handle()` �Լ��� �����մϴ�.

<!--
But interceptors that examine and modify the response from `next.handle()` 
will see all of these events. 
Your interceptor should return _every event untouched_ unless it has a _compelling reason to do otherwise_.
-->
������ `next.handle()` ���� ó���Ǵ� ������ �̺�Ʈ�� �����ϰ� �� ������ ���� Ȯ���ϰ� ������ ���� �ֽ��ϴ�.
���� _Ư���� ������ ���ٸ�_ HTTP ��û�� ������ �������� �޴� �帧�� �����ϱ� ���� _���� �帧�� �����ϴ� ��_ �� �����ϴ�.

<!--
#### Immutability
-->
{@a �Һ���}
#### �Һ��� (Immutability)

<!--
Although interceptors are capable of mutating requests and responses,
the `HttpRequest` and `HttpResponse` instance properties are `readonly`,
rendering them largely immutable.
-->
���ͼ��ʹ� HTTP ��û�� ������ ������ �� ������, `HttpRequest`�� `HttpResponse` �ν��Ͻ��� ������Ƽ���� ��κ� `readonly`�� �����Ǿ� ������, �� ������Ƽ ��ü�� ��� �̹��ͺ��Դϴ�.

<!--
They are immutable for a good reason: the app may retry a request several times before it succeeds, which means that the interceptor chain may re-process the same request multiple times.
If an interceptor could modify the original request object, the re-tried operation would start from the modified request rather than the original. Immutability ensures that interceptors see the same request for each try.
-->
������Ƽ���� �̹��ͺ�� ������ ������ �ֽ��ϴ�. ���ø����̼ǿ��� ������ HTTP ��û�� �����ϱ���� ������ ��õ��� �� �ִµ�, �� ���� ������ HTTP ��û�� ���ͼ��� ü�̴��� ������ �ݺ��ȴٴ� ���� �ǹ��մϴ�.
���� ���ͼ��Ͱ� ó�� ��û�� ��ü�� �ٲ�����ٸ�, ��õ����� �� ������ ��û�� ó���� �޶����ٴ� ���� �˴ϴ�. HTTP ��û�� ��õ� �Ǵ��� ���� ���ǿ��� ����Ǳ� ���� ���ͼ��Ϳ� ���޵Ǵ� ��ü�� �Һ����� ����Ǿ�� �մϴ�.

<!--
TypeScript will prevent you from setting `HttpRequest` readonly properties. 
-->
�׷��� ������ ���� �б� �������� ������ `HttpRequest`�� ������Ƽ�� �����ϴ� ���� TypeScript������ ��ȿ���� �ʽ��ϴ�.

<!--
```javascript
  // Typescript disallows the following assignment because req.url is readonly
  req.url = req.url.replace('http://', 'https://');
```
-->
```javascript
  // req.url�� �б� ���� ������Ƽ�̱� ������ ������ ���� ������ TypeScript���� ��ȿ���� �ʽ��ϴ�.
  req.url = req.url.replace('http://', 'https://');
```

<!--
To alter the request, clone it first and modify the clone before passing it to `next.handle()`. 
You can clone and modify the request in a single step as in this example.
-->
�׷��� ��û���� ������ ��ü�� �����Ϸ���, �� ��ü�� �ν��Ͻ��� ������ �Ŀ� `next.handle()` �޼ҵ�� �����ؾ� �մϴ�.
������ ������ ������ ������ ���� ������ �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/http-interceptors/ensure-https-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/ensure-https-interceptor.ts (excerpt)" linenums="false">
</code-example>

<!--
The `clone()` method's hash argument allows you to mutate specific properties of the request while copying the others.
-->
`clone()` �޼ҵ带 ����ϸ� Ư�� ������Ƽ�� ���� ���ϴ� ������ ������ �ν��Ͻ��� ������ �� �ְ�, ���� ����Ǵ� �ڵ鷯�� ���ο� �ν��Ͻ��� ������ �� �ֽ��ϴ�.

<!--
##### The request body
-->
#### HTTP ��û �ٵ�

<!--
The `readonly` assignment guard can't prevent deep updates and, in particular, 
it can't prevent you from modifying a property of a request body object.
-->
`readonly`�� ������ ������Ƽ ���� ���� ������ �� �����ϴ�. �׷��� ������ ���� HTTP ��û �ٵ� ���� �����ϴ� ������ ��ȿ���� �ʽ��ϴ�.

<!--
```javascript
  req.body.name = req.body.name.trim(); // bad idea!
```
-->
```javascript
  req.body.name = req.body.name.trim(); // ������ �߻��մϴ�!
```

<!--
If you must mutate the request body, copy it first, change the copy, 
`clone()` the request, and set the clone's body with the new body, as in the following example.
-->
�׷��� HTTP �ٵ� �����Ϸ���, �� �ν��Ͻ��� �����ؼ� ������ �ν��Ͻ��� ����ؾ� �մϴ�.
�� �� `clone()` �޼ҵ带 ������ ���� ����մϴ�.

<code-example 
  path="http/src/app/http-interceptors/trim-name-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/trim-name-interceptor.ts (excerpt)" linenums="false">
</code-example>

<!--
##### Clearing the request body
-->
##### HTTP ��û �ٵ� ����

<!--
Sometimes you need to clear the request body rather than replace it.
If you set the cloned request body to `undefined`, Angular assumes you intend to leave the body as is.
That is not what you want.
If you set the cloned request body to `null`, Angular knows you intend to clear the request body.
-->
� ��쿡�� HTTP ��û �ٵ� �������� �ʰ� ��� ���� ������ �ʿ��� ���� �ֽ��ϴ�.
������ ����ó�� HTTP ��û�� �����ϸ鼭 �ٵ��� ������ `undefined`�� �����ϸ�, Angular�� �ٵ� �������� �ʽ��ϴ�.
���ϴ� ���� �̰� �ƴ���.
�� �� HTTP ��û�� ������ �� `undefined` ��� `null`�� �����ϸ� Angular�� HTTP ��û �ٵ� ��� ���ϴ�.

<!--
```javascript
  newReq = req.clone({ ... }); // body not mentioned => preserve original body
  newReq = req.clone({ body: undefined }); // preserve original body
  newReq = req.clone({ body: null }); // clear the body
```
-->
```javascript
  newReq = req.clone({ ... }); // �ٵ�� ��޵��� �ʾҽ��ϴ� => ���� �ٵ� �����մϴ�.
  newReq = req.clone({ body: undefined }); // ���� �ٵ� �����˴ϴ�.
  newReq = req.clone({ body: null }); // �ٵ� ��� ���ϴ�.
```

<!--
#### Set default headers
-->
#### �⺻ ��� �����ϱ�

<!--
Apps often use an interceptor to set default headers on outgoing requests. 
-->
���ͼ��ʹ� ���ø����̼ǿ��� ������ HTTP ��û�� �⺻ ����� �����ϴ� �뵵�ε� ���� ����մϴ�.

<!--
The sample app has an `AuthService` that produces an authorization token.
Here is its `AuthInterceptor` that injects that service to get the token and
adds an authorization header with that token to every outgoing request:
-->
�̹��� �ٷ�� �ۿ��� ���� ��ū�� �����ϴ� `AuthService`�� �ֽ��ϴ�.
�׸��� `AuthInterceptor`�� �� ���񽺸� ���Թ޾� ��ū�� �޾ƿ���, ���ø����̼ǿ��� ������ ��� HTTP ��û�� ���� ����� �߰��մϴ�:

<code-example 
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  title="app/http-interceptors/auth-interceptor.ts">
</code-example>

<!--
The practice of cloning a request to set new headers is so common that 
there's a `setHeaders` shortcut for it:
-->
�� �� ����� �����ϱ� ���� HTTP ��û�� �����ϴ� ���� ���� ���Ǵ� �����̱� ������, `setHeaders` �ɼ��� ����� ���� �ֽ��ϴ�.

<code-example 
  path="http/src/app/http-interceptors/auth-interceptor.ts"
  region="set-header-shortcut">
</code-example>

<!--
An interceptor that alters headers can be used for a number of different operations, including:

* Authentication/authorization
* Caching behavior; for example, `If-Modified-Since`
* XSRF protection
-->
���ͼ��Ͱ� ����� �����ϴ� ������ ������ ���� ��쿡�� �پ��ϰ� ������ �� �ֽ��ϴ�:

* ���� �߱�/Ȯ��
* `If-Modified-Since`�� Ȱ���� ĳ��
* XSRF ����

<!--
#### Logging
-->
#### �α�

<!--
Because interceptors can process the request and response _together_, they can do things like time and log 
an entire HTTP operation. 
-->
���ͼ��ʹ� HTTP ��û�� ���信 _���_ �����ϱ� ������, HTTP ���� �ð��̳� HTTP ���ۿ� ���� ������ ��� Ȯ���� �� �ֽ��ϴ�.

<!--
Consider the following `LoggingInterceptor`, which captures the time of the request,
the time of the response, and logs the outcome with the elapsed time
with the injected `MessageService`.
-->
HTTP ��û�� �߻��� �ð��� ������ ������ �ð��� Ȯ���ϰ�, ���� HTTP ��ſ� �ɸ� �ð��� `MessageService`�� ����ϴ� ���ͼ��͸� ������ ���ô�. �� ���ͼ��ʹ� `LoggingInterceptor`��� �̸����� �����մϴ�.

<code-example 
  path="http/src/app/http-interceptors/logging-interceptor.ts"
  region="excerpt" 
  title="app/http-interceptors/logging-interceptor.ts)">
</code-example>

<!--
The RxJS `tap` operator captures whether the request succeed or failed.
The RxJS `finalize` operator is called when the response observable either errors or completes (which it must),
and reports the outcome to the `MessageService`.
-->
RxJS�� �����ϴ� `tap` �����ڿ� `finalize`�� HTTP ��û�� �����ϰų� �����ϴ� �Ϳ� ������� ��� ���信 ���� ����˴ϴ�.
�� �ڵ忡���� `finalize`�� ����� �� `MessageService`�� �α׸� �����ϴ�.

<!--
Neither `tap` nor `finalize` touch the values of the observable stream returned to the caller.
-->
`tap` �����ڿ� `finalize` ������ ��� ���������� ���� Ȯ���ϱ⸸ �ϰ�, ���������� ������ �������� �ʽ��ϴ�.

<!--
#### Caching
-->
#### ĳ��

<!--
Interceptors can handle requests by themselves, without forwarding to `next.handle()`.

For example, you might decide to cache certain requests and responses to improve performance.
You can delegate caching to an interceptor without disturbing your existing data services. 

The `CachingInterceptor` demonstrates this approach.
-->
���ͼ��ʹ� `next.handle()`�� ������� �ʰ� �� �ܰ迡�� �ٷ� ������ ���� ���� �ֽ��ϴ�.

�� ������ HTTP ��û�� ���� ������ ����Ű�� ���� Ư�� ��û�� ĳ���ϴ� �뵵�� ����� �� �ֽ��ϴ�.
�׷��� ������ �ִ� ���� ������ �������� �ʰ� ���ͼ��Ϳ� ĳ�� ����� ������ �� �ֽ��ϴ�.

`CachingInterceptor`�� ������ ���� �����մϴ�.

<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="v1" 
  title="app/http-interceptors/caching-interceptor.ts)" linenums="false">
</code-example>

<!--
The `isCachable()` function determines if the request is cachable.
In this sample, only GET requests to the npm package search api are cachable.
-->
`isCachable()` �Լ��� �� ��û�� ĳ�� ������� �Ǵ��մϴ�.
�� ���������� npm ��Ű���� GET ������� �˻��ϴ� ��û�� ĳ�� ����Դϴ�.

<!--
If the request is not cachable, the interceptor simply forwards the request 
to the next handler in the chain.
-->
HTTP ��û�� ĳ�� ����� �ƴϸ�, ���ͼ��ʹ� �� ��û�� ���� �ڵ鷯�� �׳� �����ŵ�ϴ�.

<!--
If a cachable request is found in the cache, the interceptor returns an `of()` _observable_ with
the cached response, by-passing the `next` handler (and all other interceptors downstream).
-->
�׸��� HTTP ��û�� ĳ�� ����̰� �� ������ ĳ�̵Ǿ� ������, ���ͼ��Ͱ� `of()` �����ڸ� ����ؼ� ĳ�̵� ������ �ٷ� ��ȯ�ϸ鼭 `next` �ڵ鷯�� �������� �ʽ��ϴ�.

<!--
If a cachable request is not in cache, the code calls `sendRequest`.
-->
ĳ�� ����� HTTP ��û�� ĳ�̵Ǿ� ���� ������ `sendRequest` �Լ��� �����ؼ� HTTP ��û�� �����ϴ�.

{@a send-request}
<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="send-request">
</code-example>

<!--
The `sendRequest` function creates a [request clone](#immutability) without headers
because the npm api forbids them.
-->
npm���� �����ϴ� API�� ����� ������� �ʱ� ������ `sendRequest` �Լ����� [HTTP ��û�� ������ �ν��Ͻ�](#�Һ���)�� ������ �� ����� ��� ���ϴ�.

<!--
It forwards that request to `next.handle()` which ultimately calls the server and
returns the server's response.
-->
�׸��� `next.handle()`�� �����ϸ� ������ HTTP ��û�� ���� ������ �޽��ϴ�.

<!--
Note how `sendRequest` _intercepts the response_ on its way back to the application.
It _pipes_ the response through the `tap()` operator,
whose callback adds the response to the cache.
-->
`sendRequest`�� ������ ��� ��ȯ�ϴ��� Ȯ���� ������.
�� �Լ��� �������� ���� ������ ü�̴��ϴµ�, �� �� `tap()` �����ڸ� ����ؼ� ������ ������ ĳ���մϴ�.

<!--
The original response continues untouched back up through the chain of interceptors
to the application caller. 
-->
�������� ���� ���� ������ �������� ���� ä�� HTTP ��û�� ������ ���ؽ�Ʈ�� ��ȯ�˴ϴ�.

<!--
Data services, such as `PackageSearchService`, are unaware that 
some of their `HttpClient` requests actually return cached responses.
-->
�� ���������� `PackageSearchService`�� ������ ������ ������, �� �� ���� ������ ���� HTTP ��û���� ���� ������ ĳ�̵� ���� ���� �������� �Ű澲�� �ʾƵ� �˴ϴ�.

{@a cache-refresh}
<!--
#### Return a multi-valued _Observable_
-->
#### �������� ������ Ȱ���ϱ�

<!--
The `HttpClient.get()` method normally returns an _observable_ 
that either emits the data or an error. 
Some folks describe it as a "_one and done_" observable.
-->
`HttpClient.get()` �޼ҵ�� �Ϲ������� �������� ���� �����ͳ� ������ _��������_ �ϳ��� ��ȯ�մϴ�.
�׷��� �� ���������� "_�� �� ����ϸ� ������_" ���������̶�� �մϴ�.

<!--
But an interceptor can change this to an _observable_ that emits more than once.
-->
���ͼ��ʹ� �� ���������� ������ Ȱ���� ���� �ֽ��ϴ�.

<!--
A revised version of the `CachingInterceptor` optionally returns an _observable_ that
immediately emits the cached response, sends the request to the NPM web API anyway,
and emits again later with the updated search results.
-->
�̹����� ĳ�̵� ���� ������ �� �� ��ȯ�ϰ� ������ ���, NPM �� API�� ��û�� �� �� �� ������ �̷��� ���� ������ ������ �ٽ� �� �� ������ ������� `CachingInterceptor`�� ������ ���ô�.

<code-example 
  path="http/src/app/http-interceptors/caching-interceptor.ts"
  region="intercept-refresh">
</code-example>

<!--
The _cache-then-refresh_ option is triggered by the presence of a **custom `x-refresh` header**.
-->
�� �� ������Ʈ ������� �����ϴ����� **`x-refresh`��� Ŀ���� ���**�� �����մϴ�.

<div class="alert is-helpful">

<!--
A checkbox on the `PackageSearchComponent` toggles a `withRefresh` flag,
which is one of the arguments to `PackageSearchService.search()`.
That `search()` method creates the custom `x-refresh` header
and adds it to the request before calling `HttpClient.get()`.
-->
�׸��� `PackageSearchComponent` ������Ʈ���� `withRefresh` �÷��׿� ����� üũ�ڽ��� �߰��մϴ�. �� üũ�ڽ��� ���� true�̸� `PackageSearchService.search()`���� `HttpClient.get()` �Լ��� �����ϱ� ���� `x-refresh` ����� �߰��մϴ�.

</div>

<!--
The revised `CachingInterceptor` sets up a server request 
whether there's a cached value or not, 
using the same `sendRequest()` method described [above](#send-request).
The `results$` observable will make the request when subscribed.
-->
�̷��� ������ `CachingInterceptor`�� ĳ�̵� ���� ������ �ִ� �Ͱ� ������� `sendRequest()` �޼ҵ�� ���� ��û�� �����ϴ�.
�׸��� �������� ���� ������ `results$` ��������� ó���մϴ�.

<!--
If there's no cached value, the interceptor returns `results$`.
-->
ĳ�̵� ���� ������ ������ ���ͼ��ʹ� `results$`�� �ٷ� ��ȯ�մϴ�.

<!--
If there is a cached value, the code _pipes_ the cached response onto
`results$`, producing a recomposed observable that emits twice,
the cached response first (and immediately), followed later
by the response from the server.
Subscribers see a sequence of _two_ responses.
-->
�׸��� ĳ�̵� ���� ������ �ִ� ��쿡�� ĳ�̵� ���� ������ _������_ �� �����ؼ� `results$`�� ��ġ�µ�, �� �� ĳ�̵� ���� ������ ��� ��ȯ�ǰ�, �������� ������ ���� �� �߰� ������ �������� ��ȯ�˴ϴ�.
HTTP ��û�� ������ �ʿ����� ���� ������ _�� ��_ �ް� �˴ϴ�.

<!--
### Listening to progress events
-->
### ����� �̺�Ʈ Ȯ���ϱ�

<!--
Sometimes applications transfer large amounts of data and those transfers can take a long time.
File uploads are a typical example. 
Give the users a better experience by providing feedback on the progress of such transfers.
-->
���ø����̼��� ��뷮 �����͸� �����ų� �޴� ��쿡�� HTTP ��� �ð��� ���� �ɸ� �� ������,
������ ���ε��ϴ� ��쿡 ���� �߻��ϴ� �����Դϴ�.
�� �� ����ڿ��� �����Ȳ�� ���� ������ �˷��ָ� �� ���� UX�� ������ �� �ֽ��ϴ�.

<!--
To make a request with progress events enabled, you can create an instance of `HttpRequest` 
with the `reportProgress` option set true to enable tracking of progress events.
-->
��û�� �����鼭 ����� �̺�Ʈ�� Ȱ��ȭ �Ϸ��� `HttpRequest` �ν��Ͻ��� ������ �� `reportProgress` �ɼ��� `true`�� �����ϸ� �˴ϴ�.

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-request" 
  title="app/uploader/uploader.service.ts (upload request)">
</code-example>

<div class="alert is-important">

<!--
Every progress event triggers change detection, so only turn them on if you truly intend to report progress in the UI.
-->
����� �̺�Ʈ�� �߻��� ������ ��ȭ ���� ����Ŭ�� �����ϱ� ������, ������ UI���� Ȱ���� �ʿ䰡 ���� ���� �� �ɼ��� ����ϼ���.

</div>

<!--
Next, pass this request object to the `HttpClient.request()` method, which
returns an `Observable` of `HttpEvents`, the same events processed by interceptors:
-->
�׸��� �� �ν��Ͻ��� `HttpClient.request()` �޼ҵ�� �����մϴ�. �׷��� `HttpEvents` Ÿ���� `Observable`�� ��ȯ�Ǹ�, ���ͼ��͸� ����ϴ� �Ͱ� ����� ������� ó���ϸ� �˴ϴ�:

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="upload-body" 
  title="app/uploader/uploader.service.ts (upload body)" linenums="false">
</code-example>

<!--
The `getEventMessage` method interprets each type of `HttpEvent` in the event stream.
-->
�� �ڵ忡�� ����� `getEventMessage` �޼ҵ�� �̺�Ʈ ��Ʈ������ �߻��� `HttpEvent`�� ó���մϴ�.

<code-example 
  path="http/src/app/uploader/uploader.service.ts"
  region="getEventMessage" 
  title="app/uploader/uploader.service.ts (getEventMessage)" linenums="false">
</code-example>

<div class="alert is-helpful">

<!--
The sample app for this guide doesn't have a server that accepts uploaded files.
The `UploadInterceptor` in `app/http-interceptors/upload-interceptor.ts` 
intercepts and short-circuits upload requests
by returning an observable of simulated events.
-->
�������� �ٷ� ���� ���ε��� ������ ó���ϴ� ���� ������ �����ϴ�.
�׷��� `app/http-interceptors/upload-interceptor.ts`�� ������ `UploadInterceptor`�� �� ��û�� ����ä�� ������ �����ϴ� ���� �䳻���ϴ�.

</div>

<!--
## Security: XSRF Protection
-->
## ���� : XSRF ���

<!--
[Cross-Site Request Forgery (XSRF)](https://en.wikipedia.org/wiki/Cross-site_request_forgery) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website. `HttpClient` supports a [common mechanism](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token) used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default `XSRF-TOKEN`, and sets it as an HTTP header, `X-XSRF-TOKEN`. Since only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.
-->
[����Ʈ�� ��û ���� (Cross-Site Request Forgery (XSRF))](https://en.wikipedia.org/wiki/Cross-site_request_forgery)�� �������� ���� ����ڰ� ������Ʈ�� �����ϴ� ��� �� �ϳ��Դϴ�.
Angular���� �����ϴ� `HttpClient`�� [XSRF ������ ����ϴ� ���](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-Header_Token)�� ž���ϰ� �ֽ��ϴ�.
�׷��� HTTP ��û�� �߻����� �� ��Ű���� ��ū�� �д� ���ͼ��Ͱ� �ڵ����� �����ϸ�, `XSRF-TOKEN`���� ������ HTTP ����� `X-XSRF-TOKEN`���� �����մϴ�.
�ᱹ ���� �����ο� ��ȿ�� ��Ű�� ���� �� ������, �鿣�尡 HTTP ��û�� �� �� �����ϰ� ó���� �� �ֽ��ϴ�.

<!--
By default, an interceptor sends this cookie on all mutating requests (POST, etc.)
to relative URLs but not on GET/HEAD requests or
on requests with an absolute URL.
-->
�⺻������ �� ���ͼ��ʹ� ����ּҷ� ��û�Ǵ� ��� ��û�� ����Ǹ�, ���� �ּҷ� ��û�Ǵ� GET/HEAD ��û���� ������� �ʽ��ϴ�.

<!--
To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called `XSRF-TOKEN` on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the `X-XSRF-TOKEN` HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens. Set the token to a digest of your site's authentication
cookie with a salt for added security.
-->
�׷��� ��� ��û�� ����Ʈ�� ������ ��û�� ����Ϸ���, �������� �ε�ǰų� ó�� �߻��ϴ� GET ��û�� ���ؼ� ��Ű�� `XSRF-TOKEN`�� �ִ��� Ȯ���ؾ� �մϴ�.
�׸��� ���Ŀ� �߻��� ��û�� ����� `X-XSRF-TOKEN`�� ������ ��û�� ��ȿ�� ������ �Ǵ��ϸ�, ��ȿ�� �����ο��� ����� ������ ��û�̶�� ������ ���� �Ǵ��� �� �ֽ��ϴ�.
�� �� ����ϴ� ��ū�� ����ڸ��� �޶�� �ϸ�, �������� �ݵ�� �����Ǿ�� �մϴ�.
�׷��� Ŭ���̾�Ʈ���� ��ū�� �����ϴ� �͵� ����� �� �ֽ��ϴ�.
�������� ��ū�� ������ �� ����Ű�� Ȱ���ϸ� �� �� Ȯ���մϴ�.

<!--
In order to prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.
-->
���� �����ΰ� ���� �������� �����ϸ鼭 ���� �ٸ� ȯ������ Angular ���ø����̼��� ����ϸ� �浹�� �߻��� ���� �ֽ��ϴ�. ������ ȯ�濡 ������ ��Ű �̸��� ����ϼ���.

<div class="alert is-important">

<!--
*Note that `HttpClient` supports only the client half of the XSRF protection scheme.* 
Your backend service must be configured to set the cookie for your page, and to verify that 
the header is present on all eligible requests. 
If not, Angular's default protection will be ineffective.
-->
*`HttpClient`���� �����ϴ� XSRF ��� ������ Ŭ���̾�Ʈ���� ����Ǵ� �����Դϴ�.*
�鿣�忡���� �������� ��Ű�� �����ؾ� �ϸ�, Ŭ���̾�Ʈ���� �߻��ϴ� ��� ��û�� ��ȿ���� Ȯ���ؾ� �մϴ�.
�鿣�忡�� �� ������ ó������ ������ Angular�� �����ϴ� �⺻ ��� ������ ����� �������� ���� �� �ֽ��ϴ�.

</div>

<!--
### Configuring custom cookie/header names
-->
### Ŀ���� ��Ű/��� �̸� �����ϱ�

<!--
If your backend service uses different names for the XSRF token cookie or header, 
use `HttpClientXsrfModule.withOptions()` to override the defaults.
-->
�鿣�忡�� XSRF ��ū ��Ű�� ����� �ٸ� �̸����� ����ϰ� �ִٸ� `HttpClientXsrfModule.withOptions()` �� ����ؼ� �̸��� ������ �� �ֽ��ϴ�.

<code-example 
  path="http/src/app/app.module.ts"
  region="xsrf" 
  linenums="false">
</code-example>

<!--
## Testing HTTP requests
-->
## HTTP ��û �׽�Ʈ�ϱ�

<!--
Like any external dependency, the HTTP backend needs to be mocked
so your tests can simulate interaction with a remote server. 
The `@angular/common/http/testing` library makes 
setting up such mocking straightforward.
-->
�ٸ� �ܺ� ������ ��ü�� ����������, HTTP ��û�� �׽�Ʈ�Ϸ��� �ܺ� ������ ������ �䳻���� HTTP �鿣���� ����� �ʿ��մϴ�.
�� ����� `@angular/common/http/testing` ���̺귯���� Ȱ���ؼ� ������ �� �ֽ��ϴ�.

<!--
### Mocking philosophy
-->
### ��� ���̺귯�� Ȱ�� ���

<!--
Angular's HTTP testing library is designed for a pattern of testing wherein 
the the app executes code and makes requests first.
-->
Angular�� HTTP �׽��� ���̺귯���� Ȱ���ϸ� ������� ���� ���ø����̼��� ���� ȯ�濡�� HTTP �ڵ尡 �����ϴ��� Ȯ���� �� ������, HTTP ��û�� ������ �߻��մϴ�.

<!--
Then a test expects that certain requests have or have not been made, 
performs assertions against those requests, 
and finally provide responses by "flushing" each expected request.
-->
�� �׽�Ʈ ���̽������� Ư�� ��û�� �߻��ؾ� �ϴ���, �߻����� �ʾƾ� �ϴ��� �˻��� �� ������, �˻縦 ������ �� �Ŀ��� �� ��û���� ��� �����(flushing) �մϴ�.

<!--
At the end, tests may verify that the app has made no unexpected requests.
-->
�׸��� ���� ���������� �ǵ����� ���� ��û�� �߻��ߴ��� �˻��մϴ�.

<div class="alert is-helpful">

<!--
You can run <live-example stackblitz="specs">these sample tests</live-example> 
in a live coding environment.

The tests described in this guide are in `src/testing/http-client.spec.ts`.
There are also tests of an application data service that call `HttpClient` in
`src/app/heroes/heroes.service.spec.ts`.
-->
�� ���ܿ��� �ٷ�� ������ <live-example stackblitz="specs">���� �׽�Ʈ</live-example>�� ���� �����ؼ� ����� Ȯ���� �� �ֽ��ϴ�.

�� �׽�Ʈ���� `src/testing/http-client.spec.ts` ���Ͽ� �ۼ��Ǿ� ������, `HttpClient`�� ����ϴ� ���񽺸� �׽�Ʈ�ϴ� �ڵ�� `src/app/heroes/heroes.service.spec.ts` ���Ͽ� �ۼ��Ǿ� �ս��ϴ�.

</div>

<!--
### Setup
-->
### ȯ�漳��

<!--
To begin testing calls to `HttpClient`, 
import the `HttpClientTestingModule` and the mocking controller, `HttpTestingController`,
along with the other symbols your tests require.
-->
`HttpClient`�� �׽�Ʈ�Ϸ��� ���� �׽�Ʈ�� ����� `HttpClientTestingModule`�� ��� ȯ���� �����ϴ� `HttpTestingController`�� �ε��ؾ� �մϴ�.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="imports" 
  title="app/testing/http-client.spec.ts (imports)" linenums="false">
</code-example>

<!--
Then add the `HttpClientTestingModule` to the `TestBed` and continue with
the setup of the _service-under-test_.
-->
�׸��� ���� `TestBed`�� `HttpClientTestingModule`�� �߰��ϸ鼭 �׽�Ʈ ȯ���� �����մϴ�.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="setup" 
  title="app/testing/http-client.spec.ts(setup)" linenums="false">
</code-example>

<!--
Now requests made in the course of your tests will hit the testing backend instead of the normal backend.
-->
���� �׽�Ʈ ���̽����� HTTP ��û�� �߻��ϸ� ���� �鿣�尡 �ƴ϶� �׽��� �鿣��� ���޵˴ϴ�.

<!--
This setup also calls `TestBed.get()` to inject the `HttpClient` service and the mocking controller
so they can be referenced during the tests.
-->
�� �ڵ忡���� `HttpClient` ���񽺿� ��� ��Ʈ�ѷ��� �׽�Ʈ ���̽����� �������� �����ϱ� ���� `TestBed.get()`�� ����߽��ϴ�.

<!--
### Expecting and answering requests
-->
### ��û Ȯ���ϱ�, ��û�� �����ϱ�

<!--
Now you can write a test that expects a GET Request to occur and provides a mock response. 
-->
���� GET ��û�� �߻��ϴ��� Ȯ���ϰ� ��� ������ ������ �׽�Ʈ ���̽��� �ۼ��� ���ô�.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="get-test" 
  title="app/testing/http-client.spec.ts(httpClient.get)" linenums="false">
</code-example>

<!--
The last step, verifying that no requests remain outstanding, is common enough for you to move it into an `afterEach()` step:
-->
��� ������ ó���Ǿ����� ���������� �˻��ϴ� ������ `afterEach()`�� �Űܵ� �˴ϴ�:

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="afterEach" 
  linenums="false">
</code-example>

<!--
#### Custom request expectations
-->
#### HTTP ��û ��ü �˻��ϱ�

<!--
If matching by URL isn't sufficient, it's possible to implement your own matching function. 
For example, you could look for an outgoing request that has an authorization header:
-->
������ URL�� HTTP ��û�� �Դ��� �˻��ϴ� �͸����δ� ������� �ʴٸ�, �˻� ������ ���� �ۼ��� ���� �ֽ��ϴ�.
���� ��� HTTP ��û ����� ���� ��ū�� �ִ��� �˻��ϴ� ������ ������ ���� ������ �� �ֽ��ϴ�:

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="predicate" 
  linenums="false">
</code-example>

<!--
As with the previous `expectOne()`, 
the test will fail if 0 or 2+ requests satisfy this predicate.
-->
�׷��� ������ ���캻 `expectOne()`�� ����������, HTTP ��û�� �߻����� �ʰų� 2�� �̻� �߻��� ��쿡�� ���������� ������ �߻���ŵ�ϴ�.

<!--
#### Handling more than one request
-->
#### ������ ��û�Ǵ� HTTP �׽�Ʈ�ϱ�

<!--
If you need to respond to duplicate requests in your test, use the `match()` API instead of `expectOne()`.
It takes the same arguments but returns an array of matching requests. 
Once returned, these requests are removed from future matching and 
you are responsible for flushing and verifying them.
-->
�׽�Ʈ ���̽��� ����Ǵ� �߿� HTTP ��û�� ���� �ּҷ� ������ �߻��Ѵٸ�, `expectOne()` ��� `match()` API�� ����� ���� �ֽ��ϴ�.
�� �Լ��� `expectOne()`�� ����ϴ� ����� ������, �ּҿ� ��Ī�Ǵ� HTTP ��û�� �迭�� ��ȯ�մϴ�.
�׷��� �� �迭�� �� ���� �׽�Ʈ�� ���� �ְ�, �迭�� �׸��� ���� �׽�Ʈ�� ���� �ֽ��ϴ�.

<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="multi-request" 
  linenums="false">
</code-example>

<!--
### Testing for errors
-->
### ���� �׽�Ʈ�ϱ�

<!--
You should test the app's defenses against HTTP requests that fail.
-->
HTTP ��û�� ������ ��쿡 ���ø����̼��� ��� ������ ����� �����ϴ����� �׽�Ʈ�ؾ� �մϴ�.

<!--
Call `request.flush()` with an error message, as seen in the following example.
-->
�� �� `request.flush()`�� ���� ��ü�� ������ HTTP ��ſ� ������ ��Ȳ�� �׽�Ʈ�� �� �ֽ��ϴ�.

<!--
<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="network-error"
  linenums="false">
</code-example>
-->
<code-example 
  path="http/src/testing/http-client.spec.ts"
  region="404"
  linenums="false">
</code-example>

<!--
Alternatively, you can call `request.error()` with an `ErrorEvent`.
-->
�׸��� �� ����� `ErrorEvent` ��ü�� `request.error()` �Լ��� �����ϴ� ������ε� ������ �� �ֽ��ϴ�.

<code-example
  path="http/src/testing/http-client.spec.ts"
  region="network-error"
  linenums="false">
</code-example>
