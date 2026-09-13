---
title: GraphRAG in Production — Hybrid Retrieval That Auditors Can Trust
description: How Neo4j knowledge graphs plus vector and full-text retrieval produce explainable answers for financial due diligence — patterns from building a GraphRAG knowledge engine.
date: '2026-03-01'
draft: false
slug: '/pensieve/graphrag-production'
tags:
  - GraphRAG
  - Neo4j
  - RAG
  - LLM
  - Production
---

## Why plain RAG fails on financial documents

Vector-only RAG is great at “find something that sounds like this.” Due diligence and compliance need something sharper: **who owns what**, **which clause constrains which entity**, and **why** an answer is grounded in a specific filing.

Embeddings alone blur those edges. Entities collapse into similar neighborhoods; cross-document relationships disappear; citations become soft suggestions instead of audit trails. That is the gap GraphRAG is meant to close.

## The production shape: graph + hybrid retrieval + LLM reasoning

A practical GraphRAG stack for financial and compliance corpora looks like this:

1. **Ingest** multi-format documents (filings, policies, contracts).
2. **Chunk and embed** for semantic recall.
3. **Extract entities and relations** into a **Neo4j** knowledge graph.
4. **Retrieve with hybrid fusion** — vector similarity **and** full-text / lexical search, then graph expansion around the hit set.
5. **Reason with an LLM** over a structured context pack (passages + graph neighborhood + provenance).
6. **Return an answer with citations** that map back to nodes, chunks, and source files.

The graph is not decoration. It is the index that makes “explainable” possible: you can show the path from claim → entity → document span.

## Hybrid retrieval beats single-channel retrieval

In practice, three channels complement each other:

| Channel | Strength | Failure mode |
| --- | --- | --- |
| Vector | Paraphrase and conceptual match | Misses exact identifiers, clauses, ticker symbols |
| Full-text / lexical | Exact terms, IDs, regulation codes | Brittle to wording changes |
| Graph expansion | Multi-hop ownership, parties, obligations | Needs decent extraction quality |

A solid fusion strategy ranks candidates from vector + FT, then expands 1–2 hops in Neo4j (related entities, linked clauses, prior filings). Rerank before the LLM so the context window stays dense and cheap.

## Designing for explainability

Production buyers in finance care less about flashy demos and more about:

- **Provenance** — every sentence tied to chunk IDs and graph node IDs
- **Faithfulness** — refuse or hedge when retrieval is thin
- **Deterministic scaffolding** — schema-enforced extraction (e.g. Pydantic models) so the graph does not rot
- **Evaluation** — faithfulness / relevance scores, plus human review loops on high-stakes queries

Treat the LLM as a reasoner over evidence, not as the system of record.

## Operational notes that matter more than model choice

- **Chunking** should respect document structure (sections, tables, footnotes), not only token count.
- **Entity resolution** (same company across filings) is where quality is won or lost.
- **Observability** on retrieval (hit rates per channel, empty-result rate, citation coverage) catches regressions before users do.
- **Cost** drops when hybrid retrieval shrinks the context you send to the model — fewer tokens, better answers.

## What I am shipping next

These patterns underpin the **GraphRAG Knowledge Engine** featured on this site: Neo4j knowledge graphs, hybrid vector and full-text retrieval, and LLM reasoning aimed at due diligence and risk analysis. Client-facing deployment details stay private until the customer environment is public; the architecture above is the portable part.

If you are evaluating GraphRAG vs “bigger context window,” start with retrieval quality and provenance. Model upgrades are easy to swap. A trustworthy evidence layer is not.
