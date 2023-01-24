#!/usr/bin/env bash
_() {

# Exit on error. Append "|| true" if you expect an error.
		set -o errexit
# Exit on error inside any functions or subshells.
		set -o errtrace
# Do not allow use of undefined vars. Use ${VAR:-} to use an undefined VAR
	  set -o nounset
# Turn on traces, useful while debugging but commented out by default
# set -o xtrace

    export NVM_DIR=$HOME/.nvm;
    source $NVM_DIR/nvm.sh;

    NVM_VERSION=$(nvm current);

    fancy_echo() {
      local fmt="$1"; shift
    # shellcheck disable=SC2059
      printf "\\n==> $fmt\\n" "$@"
    }

    # Install nvm and Node 18
    ensure_nvm_installed() {
        if ! command -v nvm > /dev/null; then
          fancy_echo "Installing nvm"
          curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
          export NVM_DIR="$HOME/.nvm"
          [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
          [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

          fancy_echo "Installing Node 18"
          nvm install 18
          nvm use 18
          sleep 3
        else
          fancy_echo "Nvm already installed"
          fancy_echo "Ensuring Node 18"

          # shellcheck disable=SC2162
          read version _ <<< "$NVM_VERSION"

          if [[ "$version" == "v18"* ]]; then
             fancy_echo "Node 18 already installed, skipped"
          else
             nvm install 18
             nvm use 18
             sleep 3
          fi

        fi
    }

    # All done!
    print_success() {
      fancy_echo "Done! 🍻"
    }

    ensure_nvm_installed
    print_success
}

# Now that we know the whole script has downloaded, run it.
	_ "$0" "$@"
