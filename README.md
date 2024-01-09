## ⚙ API-design (현재 수정중)

<details>
<summary> 👩‍💻 회원 API </summary>
  
### 회원가입

- 이메일
- 비밀번호

| Method               | POST                                             |
|----------------------|--------------------------------------------------|
| **URI**              | /users/join                                      |
| **HTTP status code** | Success: 201, Fail: 400                          |
| **Request Body**     | { email: "string@mail.com", password: "string" } |
| **Response Body**    |                                                  |

### 로그인

- 이메일
- 비밀번호

| Method               | POST                                             |
|----------------------|--------------------------------------------------|
| **URI**              | /users/login                                     |
| **HTTP status code** | Success: 200, Fail: 404                          |     
| **Request Body**     | { email: "string@mail.com", password: "string" } |
| **Response Cookie**  | cookie: JWT Token                                |

### 비밀번호 초기화 요청

- 이메일

| Method               | POST                         |
|----------------------|------------------------------|
| **URI**              | /users/reset                 |
| **HTTP status code** | Success: 200, Fail: 404      |
| **Request Body**     | { email: "사용자가 입력한 이메일" } |
| **Response Body**    | { email: "이메일" } |

### 비밀번호 초기화 (=수정)

- 이메일
- 비밀번호

| Method               | PUT                      |
|----------------------|--------------------------|
| **URI**              | /users/reset             |
| **HTTP status code** | Success: 200, Fail: 404  |
| **Request Body**     | { email: "이전 페이지에서 입력한 이메일" password: "string" } |
| **Response Body**    |                          |
</details>

<details>
<summary> 📚 도서 API </summary>

### 전체 도서 조회

- 목록을 한 페이지에 n개 씩 보내줘야한다. (limit, offset req필요)
- 대표 이미지
- 제목
- 작가
- 요약 정보
- 가격
- 좋아요 수

| Method               | GET                      |
|----------------------|--------------------------|
| **URI**              | /books?limit_books={page당 도서 수}&current_page={현재 page} |
| **HTTP status code** | Success: 200, Fail: 404  |
| **Request Body**     |                          |
| **Response Body**    | [ { id: 도서 id, title: "제목", img: 이미지 id(piksum image #id), summary: "요약 정보", author: "작가", price: 가격, likes: 좋아요 수, pubDate: "출간일" },<br> { id: 도서 id, title: "제목", img: 이미지 id(piksum image #id), summary: "요약 정보", author: "작가", price: 가격, likes: 좋아요 수, pubDate: "출간일"} ... ] |

### 개별 도서 조회

- 이미지 (여러장의 이미지 배열 => 슬라이드로 구성)
- 제목
- 카테고리
- 포맥
- 작가
- ISBN
- 쪽수
- 요약 설명
- 상세 설명
- 목차
- 가격
- 좋아요 수
- 내가 좋아요를 했는지 여부

| Method               | GET                      |
|----------------------|--------------------------|
| **URI**              | /books/{bookId}          |
| **HTTP status code** | Success: 200, Fail: 404  |
| **Request Body**     |                          |
| **Response Body**    | { id: 도서 id, title: "제목", img: 이미지 id(piksum image #id), category: "카테고리", format: "포맷", ISBN: ISBN, summary: "요약 정보", description: "상세 설명" , author: "작가", pages: 쪽 수, index: "목차", price: 가격, likes: 좋아요 수, pubDate: "출간일" } |

### 카테고리별 도서 목록 조회

- 페이징 필요
- new: true => 신간 조회 (기준: 출간일 1달 이내)


| Method               | GET                      |
|----------------------|--------------------------|
| **URI**              | /books?category_id={category_id}&new_book={boolean} |
| **HTTP status code** | Success: 200, Fail: 404  |
| **Request Body**     |                          |
| **Response Body**    | [ { id: 도서 id, title: "제목", img: 이미지 id(piksum image #id), summary: "요약 정보", author: "작가", price: 가격, likes: 좋아요 수, pubDate: "출간일" },<br> { id: 도서 id, title: "제목", img: 이미지 id(piksum image #id), summary: "요약 정보", author: "작가", price: 가격, likes: 좋아요 수, pubDate: "출간일" } ... ] |

</details>

<details>
<summary> 🧩 카테고리 API </summary>

### 카테고리 전체 조회

- 페이징 필요
- 메인 페이지

| Method               | GET                      |
|----------------------|--------------------------|
| **URI**              | /category                |
| **HTTP status code** | Success: 200, Fail: 404  |
| **Request Body**     |                          |
| **Response Body**    |  [ { id: 카테고리 id, name: "카테고리 종류" }, { id: 카테고리 id, name: "카테고리 종류" } ... ] |

</details>

<details>
<summary> 👍 좋아요 API </summary>

### 좋아요 추가

| Method               | POST                                             |
|----------------------|--------------------------------------------------|
| **URI**              | /likes/{bookId}                                  |
| **HTTP status code** | Success: 201, Fail: 400                          |
| **Request Body**     |                                                  |
| **Response Body**    |                                                  |


### 좋아요 취소

| Method               | DELETE                                           |
|----------------------|--------------------------------------------------|
| **URI**              | /likes/{bookId}                                  |
| **HTTP status code** | Success: 200, Fail: 400                          |
| **Request Body**     |                                                  |
| **Response Body**    |                                                  |

</details>

<details>
<summary> 🛍 장바구니 API </summary>

### 장바구니 담기

| Method               | POST                                             |
|----------------------|--------------------------------------------------|
| **URI**              | /carts                                           |
| **HTTP status code** | Success: 201, Fail: 400                          |
| **Request Body**     | { book_id: 도서 id, quantity: 수량 }              |
| **Response Body**    |                                                  |

### 장바구니 조회 / 선택한 장바구니 상품 목록 조회

- 대표이미지
- 제목
- 요약 정보
- 수량
- 금액

| Method               | GET                                              |
|----------------------|--------------------------------------------------|
| **URI**              | /carts                                           |
| **HTTP status code** | Success: 200, Fail: 404                          |
| **Request Body**     | { userId: 회원 id, selected: [cartItemsId, cartItemsId ... ] } |
| **Response Body**    | [ { id: 장바구니 도서 id, bookId: 도서 id, title: "도서 제목", summary: "요약 정보", count: 수량, price: 가격 }, <br>{ id: 장바구니 도서 id, bookId: 도서 id, title: "도서 제목", summary: "요약 정보", count: 수량, price: 가격 } ... ] |

### 장바구니 도서 삭제

| Method               | DELETE                  |
|----------------------|-------------------------|
| **URI**              | /carts/{bookId}         |
| **HTTP status code** | Success: 200, Fail: 400 |
| **Request Body**     |                         |
| **Response Body**    |                         |

</details>

<details>
<summary> 💸 결제 API </summary>

### 결제하기 (주문 등록)

- 주문 등록 insert
- 장바구니에서 주문된 상품은 delete

| Method               | POST                                             |
|----------------------|--------------------------------------------------|
| **URI**              | /orders                                          |
| **HTTP status code** | Success: 200, Fail: 400                          |
| **Request Body**     | { items: [{ cartItemId: 장바구니 도서 id, bookId: 도서 id, count: 수량 }, ...], delivery: {address: '주소', receiver: '수령인', contact: '010-0000-0000'}, totalPrice: 총 금액 } |
| **Response Body**    |                                                  |

### 주문 내역 조회

| Method               | GET                                              |
|----------------------|--------------------------------------------------|
| **URI**              | /orders                                          |
| **HTTP status code** | Success: 200, Fail: 404                          |
| **Request Body**     |                                                  |
| **Response Body**    | [ { order_id: 주문 id, created_at: '주문 일자', delivery: {address: '주소', receiver: '수령인', contact: '010-0000-0000'}, bookTitle: '대표 책 제목', totalPrice: 총 금액, totalCount: 총 수량 }, ... ] |

### 주문 내역 상품 상세 조회

| Method               | GET                                              |
|----------------------|--------------------------------------------------|
| **URI**              | /orders/{orderId}                                |
| **HTTP status code** | Success: 200, Fail: 404                          |
| **Request Body**     |                                                  |
| **Response Body**    | [{ bookId: 도서 id, book_title: '도서 제목', author: '작가명', price: 가격, count: 수량 }, ... ] |

</details>
