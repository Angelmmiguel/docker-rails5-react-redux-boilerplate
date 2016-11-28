FROM bitnami/node:7.0.0-r1
MAINTAINER Angel

# Add an user to prevent errors from npm install
RUN useradd yoshi -m && \
    sed -i -e 's/\s*Defaults\s*secure_path\s*=/# Defaults secure_path=/' /etc/sudoers && \
    echo "yoshi ALL=NOPASSWD: ALL" >> /etc/sudoers

# Set the user
USER yoshi

# Node base template
WORKDIR /app

# Main command
CMD ["node"]
