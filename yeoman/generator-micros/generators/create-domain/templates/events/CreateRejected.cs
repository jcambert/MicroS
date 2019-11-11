using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    public class Create<%= changeCase.titleCase(name)%>Rejected : <%= changeCase.titleCase(name)%>BaseRejectedEvent
    {
        public Create<%= changeCase.titleCase(name)%>Rejected(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
