using MicroS_Common.Messages;
using System;

namespace <%=namespace%>.domain.<%= changeCase.titleCase(name)%>s.Messages.Events
{
    [MessageNamespace("<%= changeCase.lowerCase(name)%>s")]
    public class <%= changeCase.titleCase(name)%>BaseRejectedEvent : BaseRejectedEvent
    {
        public <%= changeCase.titleCase(name)%>BaseRejectedEvent(Guid id, string reason, string code) : base(id, reason, code)
        {
        }
    }
}
