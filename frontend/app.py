import sys
import os

# Fix import issue permanently
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import streamlit as st
from backend.main import ask_question

st.title("College Admin FAQ Bot")

query = st.text_input("Ask your question:")

if query:
    answer = ask_question(query)
    st.write(answer)