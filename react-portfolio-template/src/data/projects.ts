import moniThumbnail from '../assets/images/moni/moni-project.png';
import moniInfra from '../assets/images/moni/모니-인프라.png';
import moniErd from '../assets/images/moni/모니-erd.png';
import moniSequence from '../assets/images/moni/모니-구독.png';
import dearDreamThumbnail from '../assets/images/dear-dream/dear-dream-project.png';
import todingThumbnail from '../assets/images/todoing/todoing-project.png';
import boxOfficeThumbnail from '../assets/images/delivery/boxoffice-project.png';

export interface TechCategory {
  label: string;
  items: string[];
}

export interface RoleDetail {
  iconKey: "payment" | "notification" | "monitoring" | "api" | "infra" | "frontend" | "user" | "pdf" | "robot";
  title: string;
  points: string[];
  troubleshooting?: { issue: string; solution: string }[];
}

export interface DiagramSection {
  title: string;
  description?: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  teamSize: string;
  summary: string;
  description: string;
  techCategories: TechCategory[];
  roles: RoleDetail[];
  diagrams: DiagramSection[];
  github: { label: string; url: string }[];
  thumbnail?: string;
}

const projects: Project[] = [
  {
    id: "moni",
    title: "모니 MONI",
    period: "2026.06 - 2026.07 (약 4주)",
    teamSize: "백엔드 6명",
    summary: "주식 초보자를 위한 AI 모의투자 플랫폼",
    description:
      "실시간 주식 데이터와 AI 기업 뉴스 분석을 바탕으로 모의투자 및 포트폴리오 분석 경험을 제공하는 플랫폼입니다. 투자 경험이 부족한 초보자가 실제 자산 없이도 안전하게 투자를 경험하고 올바른 투자 습관을 형성할 수 있도록 기획되었습니다.",
    techCategories: [
      {
        label: "백엔드",
        items: ["Java 21", "Spring Boot 3", "Gradle", "JPA", "QueryDSL", "Spring Security", "Spring Cloud Eureka", "Spring Cloud OpenFeign", "Kafka", "Swagger"],
      },
      {
        label: "데이터베이스",
        items: ["PostgreSQL", "Redis", "Redis cluster"],
      },
      {
        label: "인프라",
        items: ["Docker", "Docker Compose", "S3", "ECR", "Route53", "EC2"],
      },
      {
        label: "모니터링",
        items: ["Grafana", "Prometheus", "Loki", "Tempo", "Grafana Alloy", "OTel"],
      },
      {
        label: "테스트",
        items: ["K6", "ManusAI"],
      },
      {
        label: "기타",
        items: ["Okta", "한국투자증권 API", "Naver API", "Toss Payments API"],
      },
    ],
    roles: [
      {
        iconKey: "payment",
        title: "Payment-Service 개발",
        points: [
          "Toss Payments 연동 구독 결제 서비스 구축 (구독, 정기결제, 해지/재구독)",
          "DDD 기반 도메인 모델 설계(Payment, Subscription)",
          "Redis SET NX 분산 락으로 동시 중복 결제 제어",
          "구독 시 @Version (낙관적 락)으로 스케줄러 수행 : 사용자 동시 결제 동시성 이슈 해결",
          "@TransactionalEventListener(AFTER_COMMIT) 패턴으로 Rollback 시 Kafka 이벤트 발행 차단",
          "매일 09:00 정기결제 스케줄러. 단, 3회 실패 시 SUSPENDED 처리(잔액 부족)",
          "Flyway V1~V4 마이그레이션, Partial Index로 스케줄러 쿼리 최적화",
        ],
        troubleshooting: [
          {
            issue: "[커넥션 풀 고갈 이슈] 외부 API 호출 중 DB 커넥션 점유 최대 13초 예상, 10명 이상 동시 결제 불가능",
            solution:
              "결제 처리 로직을 REQUIRES_NEW 트랜잭션으로 분리. 결제 기록 저장, 커밋, 커넥션 반납, Toss API 호출 순으로 커넥션 풀 고갈 방지, Saga 및 보상 트랜잭션 패턴 도입",
          },
          {
            issue: "[동시성 이슈] 더블 클릭/재시도로 인한 중복 결제",
            solution:
              "Redis 분산 락(1차)과 MerchantId 멱등성 키(2차) 이중 방어로 PG 중복 청구 차단",
          },
          {
            issue: "[이벤트 발행 이슈] 결제 후 구독 이벤트 발행 Transaction 에서 Rollback 후에도 이벤트 발생되는 이슈",
            solution:
              "@TransactionalEventListener(phase = AFTER_COMMIT) 적용 — DB 커밋 완료 이후에만 리스너 실행, 롤백 시 리스너 미실행 보장",
          },
        ],
      },
      {
        iconKey: "notification",
        title: "Notification-Service 개발",
        points: [
          "SSE(Server-Sent Events) 기반 실시간 알림 서버 푸시 구현",
          "한국 주식시장 오픈/마감 5분 전 스케줄러 알림 (평일 08:55, 15:25)",
          "비동기 발송으로 단일 사용자 실패가 전체 발송에 영향 없도록 처리",
          "Last-Event-ID 헤더 기반 재연결 시 이벤트 유실 방지",
          "UUID v7(시간순 정렬) 적용으로 알림 테이블 B-Tree 페이지 분할 최소화",
        ],
        troubleshooting: [
          {
            issue: "[알람 이벤트 이슈] SSE 재연결 시 이벤트 유실",
            solution:
              "발송 이벤트를 userId_timestamp 키로 캐시 저장, Last-Event-ID 헤더 수신 시 해당 ID 이후 이벤트만 즉시 재전송",
          },
        ],
      },
      {
        iconKey: "monitoring",
        title: "모니터링 서버 구축 (Grafana Observability Stack)",
        points: [
          "AWS private subnet 내 monitor-ec2에 Grafana / Prometheus / Loki / Tempo 전체 스택 설계·구현",
          "MSA에 맞게 Eureka Server 을 통해 신규 서비스 등록 시 Prometheus 스크랩 타겟 자동 반영",
          "Agent/Gateway 패턴 분리 : service-ec2 사이드카(로그 tail + 메트릭 scrape) / monitor-ec2 게이트웨이(node-exporter 3대, postgres-exporter 7개)",
          "Tempo S3 백엔드로 분산 추적 저장, 샘플링 5% 설정",
          "Alertmanager Discord 분기 라우팅 — critical/warning 채널 분리, DiskSpaceWarning(30%) 선제 경보",
        ],
        troubleshooting: [
          {
            issue: "[기술 스택 의사결정] Promtail vs Alloy",
            solution:
              "로그 파일 실시간 감지를 위한 기존 Promtail 은 EOL 대상이기에 공식 문서에 따라 Alloy 로 마이그레이션",
          },
          {
            issue: "[로그 유실 이슈] 제한된 EC2 용량으로 디스크가 다 찰 경우 로그가 유실되는 문제 발생",
            solution:
              "로컬 ec2 에 저장되는 로그들은 7일이 지나면 자동 삭제, 대신 해당 로그들을 s3 로 저장해 약 3개월 유지하며 유실 문제 해결",
          },
          {
            issue: "[보안 이슈] 로그 저장용 S3 의 자격증명을 docker inspect 로 확인 가능한 이슈",
            solution:
              "S3 접근 시 monitor-ec2 IAM Instance Profile 로 자동 자격증명을 통해 최소 권한 부여",
          },
        ],
      },
    ],
    diagrams: [
      {
        title: "인프라 아키텍처",
        description: "AWS VPC 기반 MSA 인프라 구조. private subnet 내 서비스·인프라·모니터링 EC2 분리 운영",
        image: moniInfra,
      },
      {
        title: "ERD",
        description: "Payment / Subscription 도메인 중심 데이터베이스 스키마",
        image: moniErd,
      },
      {
        title: "이벤트 시퀀스 다이어그램 — 구독 결제",
        description: "신규 구독 요청부터 Kafka 이벤트 발행까지의 전체 흐름",
        image: moniSequence,
      },
    ],
    github: [
      { label: "전체 소스 코드", url: "https://github.com/NaejusikSamjo" },
      { label: "백엔드 소스 코드", url: "https://github.com/NaejusikSamjo/moni" },
      { label: "모니터링 소스 코드", url: "https://github.com/NaejusikSamjo/moni-monitor" },
    ],
    thumbnail: moniThumbnail,
  },
  {
    id: "dear-dream",
    title: "이어드림",
    period: "2025.05 - 2025.09 (4개월)",
    teamSize: "8인팀 (기획 2, 디자인 2, 프론트 2, 백엔드 2) | 백엔드 팀장 및 와디즈 기획, 디자인 담당",
    summary: "멀리 떨어진 부모님을 위한 우리 가족 월간 책자 서비스",
    description:
      "가족들이 한 달 동안 작성한 글과 사진을 모아 매월 한 권의 책으로 제작, 발송하는 구독형 서비스입니다. 와디즈 크라우드 펀딩 140% 달성, 용인·은평·서대문구 PoC를 통한 실증 및 사용자 리서치를 진행했습니다. 백엔드 팀장으로서 결제 시스템, PDF 자동화, 인증 구조를 설계, 구현 그리고 유지보수 했습니다.",
    techCategories: [
      {
        label: "백엔드",
        items: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "MySQL", "Redis", "Docker", "Nginx"],
      },
      {
        label: "인프라",
        items: ["S3", "CloudFront", "Ngix", "EC2", "Github Actions"],
      },
    ],
    roles: [
      {
        iconKey: "payment",
        title: "정기 구독 결제 시스템 구현",
        points: [
          "카카오페이 API 연동 구독 결제/취소/환불 시스템 구축",
          "결제 상태 머신으로 생명주기 관리",
          "DDD 도입으로 결제·가족 도메인 간 연관관계 제거, 독립적 생명주기 설계",
          "CleanUp Interceptor로 결제 미완료 PENDING 데이터 요청 종료 시점 자동 정리",
          "결제 완료 이벤트 기반 Leader 권한 승격 로직 분리",
          "환경별(dev/staging/prod) 로그 레벨 분리 및 SLF4J+Logback 구조화 로그 포맷 적용",
          "운영 환경 로그 S3 적재, 날짜,서비스별 prefix로 이슈 발생 시점 로그 즉시 조회 체계 구축",
        ],
        troubleshooting: [
          {
            issue: "[Orphan Entity 이슈] 결제 이탈 시 가족 Entity 비정상 상태 누적 및 Rollback 책임 주체 불명확",
            solution: "DDD로 결제·가족 도메인 분리 후 CleanUp Interceptor와 이벤트 기반 권한 승격 로직 분리",
          },
          {
            issue: "로그 분산으로 장애 원인 파악에 평균 2일 소요",
            solution: "환경별 로그 분리, S3 주기적 적재 체계 구축 → 장애 대응 2일에서 3시간으로 90% 단축",
          },
        ],
      },
      {
        iconKey: "pdf",
        title: "월간 PDF 생성 자동화",
        points: [
          "Spring Scheduler로 매월 정해진 시점 PDF 미리 생성 및 업로드 비동기 파이프라인 구축",
          "사용자 요청 시점에 생성 로직이 개입하지 않도록 관심사 분리",
          "CloudFront + S3 OAI 도입으로 S3 직접 접근 차단, CDN을 통해서만 콘텐츠 제공",
          "CDN Edge Caching으로 동일 PDF 반복 S3 요청을 캐시 hit으로 처리",
        ],
        troubleshooting: [
          {
            issue: "PDF 동기 생성으로 응답 Blocking 및 S3 Public 노출 보안 취약점, 중복 S3 요청 비용 누적",
            solution: "비동기 파이프라인 + CloudFront+S3 OAI + CDN 캐싱 → 응답 시간 23% 개선, S3 트래픽 40% 절감",
          },
        ],
      },
      {
        iconKey: "user",
        title: "OAuth2 및 일반 로그인 인증 통합 설계",
        points: [
          "카카오·구글·네이버 OAuth2 소셜 로그인 통합 구현",
          "OAuth2UserInfo 인터페이스 정의 + 소셜별 구현체 분리로 전략 패턴 적용",
          "AuthContext에서 소셜 타입에 따른 전략 동적 선택 — 신규 소셜 추가 시 기존 코드 수정 없이 확장 가능",
          "소셜 로그인에도 자체 Refresh Token 발급, 탈취 시 BlackList 대응 구조화",
          "Redis TTL 기반 토큰 자동 만료 처리로 DB 조회 없이 인증 처리 가능한 확장 구조",
        ],
        troubleshooting: [
          {
            issue: "[OCP 위반 이슈] 소셜 추가 시마다 기존 인증 로직 전체 수정 필요(OCP 위반, Class 책임 비대화)",
            solution: "전략 패턴 적용으로 소셜 클래스 1개만 추가하면 기존 코드 수정 없이 확장 가능한 구조로 전환",
          },
        ],
      },
    ],
    diagrams: [],
    github: [
      { label: "GitHub", url: "https://github.com/DearDreamTeam/deardream-backend" },
    ],
    thumbnail: dearDreamThumbnail,
  },
  {
    id: "todoing",
    title: "투둥이",
    period: "2025.05 - 2025.09 (4개월)",
    teamSize: "백엔드 2명 (졸업 프로젝트)",
    summary: "AI 인증 기반 Todo 습관 관리 플랫폼",
    description:
      "할 일을 완료한 뒤 사진으로 인증하는 방식의 습관 관리 플랫폼입니다. 2인 백엔드 팀이 API 설계부터 인프라 배포, 프론트엔드 구축까지 전 영역을 담당한 졸업 프로젝트입니다.",
    techCategories: [
      {
        label: "백엔드",
        items: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "MySQL", "Redis", "Google Vision API"],
      },
      {
        label: "인프라",
        items: ["Docker", "Nginx", "Terraform", "GitHub Actions", "EC2"],
      },
      {
        label: "프론트엔드",
        items: ["React", "JavaScript", "Vite", "Tailwind CSS", "Axios"],
      },
    ],
    roles: [
      {
        iconKey: "api",
        title: "API 설계 및 가중치 기반 인증 알고리즘 개발",
        points: [
          "전체 기본 API 설계 및 구현(로그인/회원가입, TODO 생성/삭제, 친구맺기, 결제, 등)",
          "Todo 완료 인증을 위한 사진 업로드 파이프라인 구축",
          "Google Vision API 반환값을 카테고리·텍스트·라벨 세 분류로 가중치 부여",
          "일치·유사·무관 가중치 합산 기반 임계값 검증 구조 설계",
          "가중치 테이블 수정만으로 인증 기준을 유연하게 변경 가능한 구조",
        ],
        troubleshooting: [
          {
            issue: "Google Vision API 단순 키워드 일치 방식으로 오탐지율 50%",
            solution: "카테고리·텍스트·라벨 3분류 가중치 알고리즘 도입 → 오탐지율 50% → 5% 감소",
          },
        ],
      },
      {
        iconKey: "infra",
        title: "Terraform 기반 IaC 도입 및 Blue-Green 배포",
        points: [
          "Terraform으로 VPC, Subnet, SG, EC2 등 전체 인프라 코드화",
          "환경별 변수 파일만 교체해 동일 코드베이스로 dev/staging/prod 프로비저닝",
          "네트워크·컴퓨팅·DB 레이어 모듈화로 레이어 단위 독립 재배포",
          "Blue-Green 배포로 트래픽 전환 및 문제 발생 시 즉시 롤백 구조 구현",
        ],
        troubleshooting: [
          {
            issue: "AWS 콘솔 수동 작업으로 환경 복제 불가, 신규 환경 구성에 최소 1일 소요",
            solution: "Terraform IaC 도입 → 신규 환경 구성 시간 1일 → 15분으로 90% 단축",
          },
        ],
      },
      {
        iconKey: "frontend",
        title: "AI 기반 프론트엔드 구축",
        points: [
          "2인 백엔드 팀에서 프론트엔드 인력 없이 React + Vite + Tailwind CSS로 UI 전체 구축",
          "Claude, Cursor, GPT를 활용한 컴포넌트 단위 UI 생성 및 직접 검토·수정",
          "반복 UI 패턴 템플릿화로 디자인 컴포넌트 재사용 구조 구축",
          "백엔드 API와 Axios 연동 완료",
        ],
        troubleshooting: [
          {
            issue: "프론트 개발 인력 없이 UI 구축 및 학습에 시간 부족",
            solution: "AI 도구 적극 활용 → 예상 대비 50% 이하 시간으로 UI 구축 완료",
          },
        ],
      },
    ],
    diagrams: [],
    github: [
      { label: "GitHub", url: "https://github.com/orgs/2025todoing/repositories" },
    ],
    thumbnail: todingThumbnail,
  },
  {
    id: "box-office",
    title: "Box Office",
    period: "2026.04 - 2026.05 (2주)",
    teamSize: "백엔드 6명",
    summary: "B2B 물류 배송 MSA 토이 프로젝트",
    description:
      "MSA 구조 기반 B2B 물류 배송 플랫폼 토이 프로젝트입니다. 주문 도메인 개발과 시스템 아키텍처 설계를 담당했으며, 10만 건 데이터·200VU 부하 환경에서 성능 최적화와 분산 트랜잭션 설계에 집중했습니다.",
    techCategories: [
      {
        label: "백엔드",
        items: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "Kafka", "Spring Cloud Gateway", "MSA"],
      },
      {
        label: "데이터베이스",
        items: ["PostgreSQL", "Redis"],
      },
      {
        label: "인프라",
        items: ["Docker", "Docker-Compose"],
      },
    ],
    roles: [
      {
        iconKey: "monitoring",
        title: "주문 조회 성능 최적화",
        points: [
          "10만 건 데이터 기준 최대 200VU 환경에서 성능 병목 분석",
          "커넥션 풀 10 → 20으로 조정, BatchSize 40 적용으로 N+1 쿼리 해소",
          "특정 ROLE 조회 시 1~3 페이지 Redis 캐싱 적용으로 DB 풀 스캔 제거",
          "비즈니스 협의를 통한 주문 상세 내역 필드 제거로 응답 최소화",
        ],
        troubleshooting: [
          {
            issue: "[응답 시간 이슈] 에러율 5.77%, p95 응답시간 3,920ms (google 의 4-golden-signals 미달)",
            solution: "커넥션 풀 확장(10->20), BatchSize, Redis 캐싱 을 통해 에러율 0.00%, p95 60% 개선 (918ms → 368ms), 요청 당 쿼리 11건 → 2건으로 감소",
          },
        ],
      },
      {
        iconKey: "api",
        title: "MSA 분산 트랜잭션 주문 생성 설계",
        points: [
          "DB 저장 전 애플리케이션 레벨에서 주문 식별자 발급 후 MDC 저장 및 로깅 스레드 추적 활성화",
          "CQRS 적용으로 쓰기 구간에만 트랜잭션 처리, 커넥션 점유 시간 최소화",
          "2PC 기반 명시적 보상 트랜잭션 구현",
          "재고 차감 타임아웃 시나리오 대비 멱등키 제공 및 SAGA 패턴 적용",
        ],
        troubleshooting: [
          {
            issue: "[타임아웃 이슈] 단일 트랜잭션 내 외부 API 동기 호출로 커넥션·스레드 풀 고갈 위험 및 분산 롤백 불가",
            solution: "CQRS로 트랜잭션 범위 최소화, SAGA 패턴, 멱등키로 중복 요청 식별 → Throughput 개선 및 데이터 정합성 보장",
          },
        ],
      },
      {
        iconKey: "robot",
        title: "Context Engineering 기반 Claude Code 활용",
        points: [
          "컨벤션, API 명세, 아키텍처, ERD를 별도 파일로 분리하고 CLAUDE.md에서 참조하는 구조로 관리",
          "승인 기반 워크플로우로 오버 엔지니어링 및 트레이드오프를 직접 확인하는 개발 프로세스 정립",
          "자동화된 문서화·문제 분석·테스트를 위한 Context Engineering 적용으로 일관된 품질 확보",
          "테스트 커버리지 80%를 목표로 테스트 자동화 수행",
        ],
      },
    ],
    diagrams: [],
    github: [
      { label: "GitHub", url: "https://github.com/boxoffice-sparta/boxoffice" },
    ],
    thumbnail: boxOfficeThumbnail,
  },
];

export default projects;
