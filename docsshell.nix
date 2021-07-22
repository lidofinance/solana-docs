let
   pkgs = import <nixpkgs> {};
in
  pkgs.mkShell {


  buildInputs = with pkgs; [
    nodejs-14_x
    autoconf
    autogen
    automake
    zlib
    libpng
    nasm
    pkg-config
    yarn
  ];
}
