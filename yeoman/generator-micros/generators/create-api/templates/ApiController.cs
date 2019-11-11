using MicroS_Common.Mvc;
using MicroS_Common.RabbitMq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenTracing;
using System;
using System.Threading.Tasks;
using <%=namespace%>.api.Framework;
using <%=namespace%>.api.Services;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Messages.Commands;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Queries;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.api.Controllers
{
    /// <summary>
    /// <%= changeCase.titleCase(name) %> Controller that represent tha main API layer
    /// on wich each request must be made
    /// </summary>
    [AdminAuth]
    [Route("<%= changeCase.lowerCase(name) %>s")]
    public partial class <%= changeCase.titleCase(name) %>sController : BaseController
    {
        #region private varaibles
        private readonly I<%= changeCase.titleCase(name) %>sService _<%= changeCase.lowerCase(name) %>sService;
        private readonly ILogger<Create<%= changeCase.titleCase(name) %>> _logger;
        #endregion

        #region constructors
        public <%= changeCase.titleCase(name) %>sController(IBusPublisher busPublisher, ITracer tracer,
            I<%= changeCase.titleCase(name) %>sService <%= changeCase.lowerCase(name) %>sService,ILogger<Create<%= changeCase.titleCase(name) %>>logger) : base(busPublisher, tracer)
        {
            _<%= changeCase.lowerCase(name) %>sService = <%= changeCase.lowerCase(name) %>sService;
            _logger = logger;
        }
        #endregion

        #region public functions
         /// <summary>
        ///  Make a get query 
        /// </summary>
        /// <param name="query">The Query</param>
        /// <returns>A list of result</returns>
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get([FromQuery] Browse<%= changeCase.titleCase(name) %>s query)
            => Collection(await _<%= changeCase.lowerCase(name) %>sService.BrowseAsync(query));

        /// <summary>
        /// Search an Unique <%= changeCase.lowerCase(name) %> based on its id
        /// </summary>
        /// <param name="id">The Id to search</param>
        /// <returns>The <%= changeCase.lowerCase(name) %></returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(Guid id)
            => Single(await _<%= changeCase.lowerCase(name) %>sService.GetAsync(id));

        /// <summary>
        ///  Create a new <%= changeCase.lowerCase(name) %>
        /// </summary>
        /// <param name="command">The Create Command</param>
        /// <returns>Accepted response: The the operation Service</returns>
        [HttpPost]
        public async Task<IActionResult> Post(Create<%= changeCase.titleCase(name) %> command)
            => await SendAsync(command.BindId(c => c.Id,_logger),  resourceId: command.Id, resource: "<%= changeCase.lowerCase(name) %>s");

        /// <summary>
        /// Update a <%= changeCase.lowerCase(name) %>
        /// </summary>
        /// <param name="id">the id of <%= changeCase.lowerCase(name) %> to update</param>
        /// <param name="command">The Update Command</param>
        /// <returns>Accepted response: The the operation Service</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, Update<%= changeCase.titleCase(name) %> command)
            => await SendAsync(command.Bind(c => c.Id, id),resourceId: command.Id, resource: "<%= changeCase.lowerCase(name) %>s");

        /// <summary>
        /// Delete a <%= changeCase.lowerCase(name) %>
        /// </summary>
        /// <param name="id">the id of <%= changeCase.lowerCase(name) %> to delete</param>
        /// <returns>Accepted response: The the operation Service</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
            => await SendAsync(new Delete<%= changeCase.titleCase(name) %>(id));

        #endregion
    }
}
