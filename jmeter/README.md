# JMeter

Performance and load testing with Apache JMeter

## Capabilities

- Design load tests with Thread Groups simulating many virtual users, with configurable ramp-up and loop count
- Build HTTP requests quickly via cURL import and sampler configuration
- Parameterize data with CSV Data Set Config so each thread uses unique data
- Correlate and chain variables with JSON Extractor and Regular Expression Extractor
- Add assertions (Response, JSON, Duration) to prevent false positives
- Model realistic think time with timers (Constant, Uniform Random, Constant Throughput)
- Use GUI mode to build and debug, then switch to Non-GUI (CLI) for accurate real load runs
- Read full metrics: response time, throughput, latency, error rate, and percentiles (90/95/99)
- Analyze and fix bottlenecks, e.g. resolving data collision to drop error rate from 19.92% to 0.00% (over 25,000 requests) and raise throughput from 142 to 433 req/s
- Generate HTML dashboard reports and support distributed testing, integrated with CI/CD
