FROM mcr.microsoft.com/devcontainers/typescript-node:22
RUN corepack enable && corepack prepare pnpm@latest --activate
USER node
RUN curl -fsSL https://opencode.ai/install | bash
ENV PATH="/home/node/.opencode/bin:${PATH}"
