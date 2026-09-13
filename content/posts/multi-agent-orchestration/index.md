---
title: Multi-Agent Orchestration with LangGraph — Patterns That Survive Production
description: Supervisor routing, specialized agents, tool use, and failure modes from shipping real-estate and data-analyst multi-agent systems on LangGraph and DeepAgents.
date: '2026-03-15'
draft: false
slug: '/pensieve/multi-agent-orchestration'
tags:
  - Multi-Agent
  - LangGraph
  - DeepAgents
  - LLM
  - Production
---

## One model is not a product

A single chat completion can draft text. Production workflows need **routing**, **tools**, **memory**, and **clear ownership of failure**. Multi-agent systems earn their complexity when the work naturally splits: search vs finance vs market research; plan vs code vs execute.

This post captures patterns from shipping:

- a **real-estate deep-agents** stack (LangGraph + specialized agents + RAG)
- an **agentic data analyst** that turns natural language into sandboxed Python

## Prefer a graph of steps over a pile of prompts

**LangGraph**-style orchestration gives you:

- explicit nodes (agents / tools / validators)
- edges with conditions (route, retry, escalate, stop)
- **checkpointed state** so long jobs can resume and audits can replay

That beats an unbounded “agent loop” that mutates a blob of chat history until tokens run out.

A durable shape:

```
User → Supervisor / orchestrator
          ├─ Specialist A (tools)
          ├─ Specialist B (tools)
          └─ Synthesizer → final artifact
```

Keep the supervisor thin: classify intent, pick agents, merge results, enforce budgets (steps, tokens, wall clock).

## Specialist agents beat mega-prompts

In the real-estate platform, separate agents for **search**, **finance**, and **market** work better than one prompt that tries to do everything:

- clearer tool permissions
- smaller context per call
- independent evaluation
- easier rollback when one skill regresses

The **Agentic Data Analyst** follows the same idea along a pipeline: understand query → generate code → **sandbox execute** → present in Streamlit. Code execution is a different trust boundary than “write an answer”; isolate it.

## Tool use is where systems actually fail

Common failure modes (and mitigations):

| Failure | Symptom | Mitigation |
| --- | --- | --- |
| Tool hallucination | Invented APIs / paths | Strict tool schemas; reject unknown names |
| Infinite loops | Same node retries forever | Max steps; circuit breakers; escalate to human |
| Context bloat | Latency and cost explode | Summarize intermediate state; pass IDs not dumps |
| Unsafe code | Arbitrary exec in analyst flows | Docker/host sandbox (e.g. patterns like **codibox**); no network by default |
| Silent wrong answers | Confident nonsense | Critic / grader node; require citations or tests |

Design the graph so **failure is a first-class edge**, not an exception you only see in logs.

## State, checkpoints, and auditability

Financial and analytical users ask “how did you get this?” Checkpointed graphs let you:

- resume after timeouts
- inspect which agent produced which claim
- A/B route models (OpenAI, Anthropic, Gemini, Bedrock, …) behind the same graph contract

Multi-LLM routing belongs in the orchestrator, not scattered inside each agent.

## When not to use multi-agent

Skip the swarm if:

- one retrieval + one generation pass solves 90% of queries
- you cannot define clear agent responsibilities
- you lack evals for the end-to-end path

Start with a **single agent + tools**. Promote to multi-agent when handoffs and specialization show up in the eval set, not in a slide deck.

## Practical checklist before production

1. Hard caps on steps, tokens, and wall time
2. Typed state and validated tool I/O
3. Sandboxed execution for any generated code
4. Observability per node (latency, error rate, retry count)
5. Human-readable traces for support and compliance
6. A graceful degrade path (partial answer + uncertainty)

Multi-agent orchestration is software architecture with LLMs in the loop — treat it like distributed systems, not magic.
