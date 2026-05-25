# Example Prompts

This document provides concrete prompt examples for different scenarios. Use these as templates and adapt them to your specific needs.

## Feature Design

### User Authentication System

**Prompt**: "Design a user authentication system for a web application"

**What to expect**:
- Branches exploring: JWT vs session-based auth, OAuth integration, multi-factor authentication
- Questions about: Security requirements, user types, session management, password policies
- Output: Comprehensive auth system design with security considerations

### E-commerce Shopping Cart

**Prompt**: "Design a shopping cart system for an e-commerce platform"

**What to expect**:
- Branches exploring: Session-based vs persistent carts, guest checkout, cart sharing
- Questions about: Inventory management, pricing calculations, cart persistence, abandoned cart recovery
- Output: Cart architecture with data models and API design

### Real-time Notifications

**Prompt**: "Design a real-time notification system for a collaborative application"

**What to expect**:
- Branches exploring: WebSocket vs Server-Sent Events, push notifications, polling strategies
- Questions about: Delivery guarantees, offline support, notification types, scaling considerations
- Output: Notification architecture with protocol selection and implementation patterns

## Architecture Decisions

### Database Selection

**Prompt**: "Compare database options for a high-traffic read-heavy application"

**What to expect**:
- Branches exploring: PostgreSQL vs MySQL vs MongoDB vs Redis
- Questions about: Data consistency requirements, query patterns, scaling needs, team expertise
- Output: Database comparison with recommendations and migration strategies

### Microservices vs Monolith

**Prompt**: "Evaluate microservices architecture vs monolithic architecture for our application"

**What to expect**:
- Branches exploring: Pure microservices, modular monolith, hybrid approaches
- Questions about: Team size, deployment complexity, data consistency, operational overhead
- Output: Architecture recommendation with migration path and operational considerations

### API Design Patterns

**Prompt**: "Design API patterns for a mobile-first application with offline support"

**What to expect**:
- Branches exploring: REST vs GraphQL vs gRPC, offline-first patterns, sync strategies
- Questions about: Data synchronization, conflict resolution, bandwidth optimization, caching
- Output: API architecture with protocol selection and offline support patterns

## Technical Choices

### Caching Strategy

**Prompt**: "Design a caching strategy for an API with varying data freshness requirements"

**What to expect**:
- Branches exploring: Application-level caching, CDN caching, database query caching, edge computing
- Questions about: Cache invalidation, TTL strategies, cache warming, monitoring
- Output: Multi-layer caching architecture with invalidation strategies

### File Storage

**Prompt**: "Design a file storage system for user-generated content"

**What to expect**:
- Branches exploring: Local storage vs cloud storage (S3, GCS), CDN integration, direct uploads
- Questions about: File size limits, access patterns, backup requirements, cost optimization
- Output: Storage architecture with upload/download flows and cost considerations

### Search Implementation

**Prompt**: "Design search functionality for a content-heavy application"

**What to expect**:
- Branches exploring: Full-text search (PostgreSQL, Elasticsearch), specialized search services, hybrid approaches
- Questions about: Search relevance, filtering requirements, performance needs, indexing strategy
- Output: Search architecture with indexing strategy and query patterns

## System Design

### Payment Processing

**Prompt**: "Design a payment processing system for a subscription service"

**What to expect**:
- Branches exploring: Stripe vs PayPal vs custom integration, subscription management, proration
- Questions about: Payment methods, retry logic, webhook handling, compliance requirements
- Output: Payment architecture with integration patterns and compliance considerations

### Content Management

**Prompt**: "Design a content management system for a multi-tenant SaaS platform"

**What to expect**:
- Branches exploring: Headless CMS vs traditional CMS, custom solution, third-party integration
- Questions about: Content types, workflow, versioning, multi-tenancy, preview environments
- Output: CMS architecture with content modeling and workflow design

### Analytics Platform

**Prompt**: "Design an analytics platform for tracking user behavior across multiple applications"

**What to expect**:
- Branches exploring: Event streaming vs batch processing, real-time vs historical analysis, data warehouse design
- Questions about: Event schema, sampling strategies, privacy compliance, visualization needs
- Output: Analytics architecture with data pipeline and visualization strategy

## DevOps & Infrastructure

### Deployment Strategy

**Prompt**: "Design a deployment strategy for a containerized application with zero-downtime requirements"

**What to expect**:
- Branches exploring: Kubernetes vs Docker Swarm vs serverless, blue-green vs canary deployments
- Questions about: Rollback strategies, health checks, traffic management, monitoring
- Output: Deployment architecture with CI/CD pipeline and operational procedures

### Monitoring & Observability

**Prompt**: "Design a monitoring and observability strategy for a distributed system"

**What to expect**:
- Branches exploring: Metrics vs logs vs traces, centralized vs decentralized, open-source vs commercial
- Questions about: Alert thresholds, retention policies, dashboards, cost optimization
- Output: Monitoring architecture with data collection and alerting strategy

### Disaster Recovery

**Prompt**: "Design a disaster recovery plan for a critical business application"

**What to expect**:
- Branches exploring: Active-active vs active-passive, RPO/RTO targets, geographic distribution
- Questions about: Backup strategies, failover automation, testing procedures, communication plans
- Output: DR architecture with recovery procedures and testing strategy

## Security Design

### API Security

**Prompt**: "Design security measures for a public-facing API"

**What to expect**:
- Branches exploring: Authentication vs authorization, rate limiting, input validation, encryption
- Questions about: Threat model, compliance requirements, performance impact, user experience
- Output: Security architecture with threat mitigation and implementation patterns

### Data Privacy

**Prompt**: "Design data privacy measures for a GDPR-compliant application"

**What to expect**:
- Branches exploring: Data minimization, anonymization, consent management, right to be forgotten
- Questions about: Data classification, retention policies, breach response, user controls
- Output: Privacy architecture with compliance measures and user controls

### Infrastructure Security

**Prompt**: "Design security measures for cloud infrastructure"

**What to expect**:
- Branches exploring: Network security, identity management, secrets management, compliance controls
- Questions about: Defense in depth, monitoring, incident response, cost optimization
- Output: Security architecture with hardening measures and monitoring strategy

## Prompt Templates

### Basic Template

```
Design a [component/system] for [application/context] with [key requirements]
```

### Comparative Template

```
Compare [option A] vs [option B] vs [option C] for [use case] considering [constraints]
```

### Architecture Template

```
Design [architecture pattern] for [application] with [specific challenges]
```

### Optimization Template

```
Optimize [existing system] for [performance goal] given [current constraints]
```

## Customizing Prompts

### Adding Context

**Basic**: "Design a caching system"
**With context**: "Design a caching system for a high-traffic API with 10M daily requests and varying data freshness requirements"

### Specifying Constraints

**Basic**: "Design a database schema"
**With constraints**: "Design a database schema for a multi-tenant SaaS platform with strict data isolation requirements and complex query patterns"

### Including Requirements

**Basic**: "Design an authentication system"
**With requirements**: "Design an authentication system supporting social login, multi-factor authentication, and session management across multiple devices"

## Prompt Anti-Patterns

### Too Vague

❌ "Design something for my app"
✅ "Design a user authentication system for a web application"

### Too Specific

❌ "Design a REST API with exactly 5 endpoints using JWT authentication with 1-hour token expiration"
✅ "Design a REST API for user management with secure authentication"

### Missing Context

❌ "Design a database"
✅ "Design a database for an e-commerce platform with high read volume and inventory management needs"

### Overly Constrained

❌ "Design a microservices architecture using Kubernetes, Docker, and PostgreSQL with specific service boundaries"
✅ "Design a scalable architecture for our application considering team size and deployment complexity"

## Advanced Prompting

### Multi-Stage Design

**Stage 1**: "Design the high-level architecture for [system]"
**Stage 2**: "Detail the data layer for [specific component]"
**Stage 3**: "Design the API interfaces for [specific service]"

### Iterative Refinement

**Initial**: "Design a caching strategy"
**Follow-up**: "Refine the caching strategy focusing on cache invalidation for dynamic content"
**Final**: "Add monitoring and alerting for the caching system"

### Comparative Analysis

**Prompt**: "Compare three approaches for [problem] considering [criteria A], [criteria B], and [criteria C]"

**What to expect**: Detailed comparison matrix with pros/cons and recommendations

## Next Steps

- Try these prompts with your specific use cases
- Adapt the templates to your domain and requirements
- Combine multiple prompts for complex system design
- Review [Best Practices](./best-practices.md) for advanced techniques